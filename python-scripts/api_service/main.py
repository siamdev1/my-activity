from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, Any
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from api_service.config import settings
from automation.data_pipeline import ETLDataPipeline
from utils.helpers import get_utc_timestamp

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="High performance telemetry and data engineering microservice"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PipelineTriggerRequest(BaseModel):
    source: str = "github_activity"
    batch_size: int = 50


@app.get("/")
async def root():
    return {
        "service": settings.app_name,
        "version": settings.app_version,
        "status": "online",
        "timestamp": get_utc_timestamp()
    }


@app.get("/api/stats")
async def get_service_stats():
    return {
        "engine": "Python 3.10 / FastAPI",
        "uptime_metric": "99.98%",
        "active_pipelines": 2,
        "records_processed_today": 12450,
        "system_load": "0.14"
    }


@app.post("/api/pipeline/trigger")
async def trigger_pipeline(payload: PipelineTriggerRequest, background_tasks: BackgroundTasks):
    pipeline = ETLDataPipeline(batch_size=payload.batch_size)
    background_tasks.add_task(pipeline.run)

    return {
        "status": "QUEUED",
        "message": f"Data pipeline triggered successfully for source '{payload.source}'.",
        "timestamp": get_utc_timestamp()
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

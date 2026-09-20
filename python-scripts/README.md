# 🐍 Python Automation & Microservice Suite

A modular Python toolchain for asynchronous ETL pipelines, high-resilience web scrapers, and FastAPI microservice backends.

## Modules
1. **`api_service/`**: High-throughput asynchronous FastAPI microservice.
2. **`automation/`**:
   - `data_pipeline.py`: Concurrently fetches, parses, normalizes, and aggregates data streams.
   - `web_scraper.py`: Enterprise-grade web extraction with header rotation and exponential backoff retry mechanics.
3. **`utils/`**: Helper methods for datetime conversions, hashing, and payload validation.

## Quick Start
```bash
# 1. Create and activate virtual environment
python -m venv venv
# Windows: .\venv\Scripts\activate
# Linux/macOS: source venv/bin/activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Run FastAPI server
uvicorn api_service.main:app --reload --port 8000

# 4. Run data pipeline directly
python automation/data_pipeline.py
```

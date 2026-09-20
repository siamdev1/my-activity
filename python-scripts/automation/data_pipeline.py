import asyncio
import time
from typing import Dict, List, Any
import sys
import os

# Add parent directory to path for imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from utils.helpers import logger, get_utc_timestamp, generate_sha256


class ETLDataPipeline:
    """
    Asynchronous ETL pipeline for extracting, transforming,
    and loading activity metrics and logs.
    """

    def __init__(self, batch_size: int = 50):
        self.batch_size = batch_size
        self.processed_records: List[Dict[str, Any]] = []

    async def extract_source_data(self) -> List[Dict[str, Any]]:
        """Simulate extracting raw records from external API/stream."""
        logger.info("Extracting raw metrics data from ingestion stream...")
        await asyncio.sleep(0.5)

        raw_events = [
            {"event": "commit", "author": "siamdev1", "repo": "my-activity", "timestamp": get_utc_timestamp()},
            {"event": "pull_request", "author": "siamdev1", "repo": "backend-node", "timestamp": get_utc_timestamp()},
            {"event": "release", "author": "siamdev1", "repo": "react-dashboard", "timestamp": get_utc_timestamp()},
            {"event": "plugin_update", "author": "siamdev1", "repo": "wordpress-toolkit", "timestamp": get_utc_timestamp()},
        ]
        return raw_events

    async def transform_records(self, raw_records: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Clean, normalize, and enrich data records."""
        logger.info(f"Transforming {len(raw_records)} records...")
        transformed = []

        for record in raw_records:
            signature = generate_sha256(f"{record['event']}_{record['timestamp']}")
            transformed.append({
                "id": signature[:12],
                "event_type": record["event"].upper(),
                "contributor": record["author"],
                "target_repository": record["repo"],
                "processed_at": get_utc_timestamp(),
                "status": "PROCESSED"
            })
            await asyncio.sleep(0.05)

        return transformed

    async def load_data(self, records: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Load enriched records into aggregated datastore."""
        logger.info(f"Loading {len(records)} enriched records into database...")
        await asyncio.sleep(0.3)
        self.processed_records.extend(records)

        return {
            "status": "SUCCESS",
            "records_inserted": len(records),
            "total_records": len(self.processed_records),
            "completed_at": get_utc_timestamp()
        }

    async def run(self) -> Dict[str, Any]:
        """Execute entire ETL lifecycle."""
        start_time = time.time()
        logger.info("Starting ETL pipeline execution cycle...")

        raw_data = await self.extract_source_data()
        transformed = await self.transform_records(raw_data)
        summary = await self.load_data(transformed)

        elapsed = round(time.time() - start_time, 3)
        summary["duration_seconds"] = elapsed
        logger.info(f"ETL pipeline finished in {elapsed}s.")
        return summary


if __name__ == "__main__":
    pipeline = ETLDataPipeline()
    result = asyncio.run(pipeline.run())
    print("\n--- Pipeline Execution Summary ---")
    print(result)

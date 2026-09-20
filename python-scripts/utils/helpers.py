import hashlib
import json
import logging
from datetime import datetime, timezone
from typing import Any, Dict

# Setup logger
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)
logger = logging.getLogger("PythonSuite")


def generate_sha256(data: str) -> str:
    """Generate a SHA-256 hash string for input data."""
    return hashlib.sha256(data.encode("utf-8")).hexdigest()


def get_utc_timestamp() -> str:
    """Return formatted ISO-8601 UTC timestamp."""
    return datetime.now(timezone.utc).isoformat()


def safe_json_dump(data: Dict[str, Any], filepath: str) -> bool:
    """Safely dump dictionary payload to JSON file."""
    try:
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        return True
    except Exception as exc:
        logger.error(f"Failed to dump JSON to {filepath}: {exc}")
        return False

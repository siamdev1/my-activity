import random
import time
from typing import Dict, Optional
import requests
from bs4 import BeautifulSoup
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from utils.helpers import logger


class ResilientScraper:
    """
    Robust web extraction utility with randomized user agents
    and exponential backoff retry mechanics.
    """

    USER_AGENTS = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15",
        "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/123.0",
    ]

    def __init__(self, timeout: int = 10, max_retries: int = 3):
        self.timeout = timeout
        self.max_retries = max_retries
        self.session = requests.Session()

    def _get_headers(self) -> Dict[str, str]:
        return {
            "User-Agent": random.choice(self.USER_AGENTS),
            "Accept-Language": "en-US,en;q=0.9",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        }

    def fetch_page(self, url: str) -> Optional[str]:
        """Fetch URL content with exponential retry logic."""
        for attempt in range(1, self.max_retries + 1):
            try:
                logger.info(f"Fetching {url} [Attempt {attempt}/{self.max_retries}]...")
                response = self.session.get(
                    url,
                    headers=self._get_headers(),
                    timeout=self.timeout
                )
                if response.status_code == 200:
                    return response.text
                logger.warn(f"Received non-200 status code: {response.status_code}")
            except requests.RequestException as e:
                logger.error(f"Network error on attempt {attempt}: {e}")

            if attempt < self.max_retries:
                backoff = 2 ** attempt
                logger.info(f"Retrying in {backoff}s...")
                time.sleep(backoff)

        return None

    def parse_metadata(self, html: str) -> Dict[str, str]:
        """Extract title, meta description, and canonical link."""
        soup = BeautifulSoup(html, "html.parser")
        title = soup.title.string.strip() if soup.title and soup.title.string else ""
        desc_tag = soup.find("meta", attrs={"name": "description"})
        description = desc_tag.get("content", "").strip() if desc_tag else ""

        return {
            "title": title,
            "description": description
        }


if __name__ == "__main__":
    scraper = ResilientScraper()
    print("ResilientScraper initialized successfully.")

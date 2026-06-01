import requests
import os
import time
from pathlib import Path

class ImageScraper:
    def __init__(self, save_dir='images'):
        self.save_dir = Path(save_dir)
        self.save_dir.mkdir(parents=True, exist_ok=True)
        self.headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        self.session = requests.Session()
        self.session.headers.update(self.headers)

    def download_image(self, url, filename):
        try:
            response = self.session.get(url, timeout=30)
            response.raise_for_status()
            filepath = self.save_dir / filename
            with open(filepath, 'wb') as f: f.write(response.content)
            print(f'✓ Downloaded: {filename}')
            return True
        except Exception as e:
            print(f'✗ Failed: {e}')
            return False

    def scrape_unsplash(self, query, count=10):
        print(f'\n=== Scraping: {query} ===')
        search_url = 'https://unsplash.com/napi/search/photos'
        params = {'query': query, 'per_page': count, 'orientation': 'landscape'}
        try:
            response = self.session.get(search_url, params=params, timeout=30)
            data = response.json()
            for idx, photo in enumerate(data.get('results', [])):
                self.download_image(photo['urls']['regular'], f'{query}_{idx+1}.jpg')
                time.sleep(1)
        except Exception as e: print(f'Error: {e}')

def main():
    scraper = ImageScraper(save_dir='images')
    queries = ['mountain sunrise', 'ancient town', 'lake', 'theme park', 'hiking', 'museum', 'night market', 'flower field']
    for query in queries: scraper.scrape_unsplash(query, count=2)
    print('\nScraping completed!')

if __name__ == '__main__': main()
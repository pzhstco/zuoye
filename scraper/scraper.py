import requests
import os
import time
from pathlib import Path

class ImageScraper:
    def __init__(self, save_dir='images'):
        self.save_dir = Path(save_dir)
        self.save_dir.mkdir(parents=True, exist_ok=True)
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
        self.session = requests.Session()
        self.session.headers.update(self.headers)

    def download_image(self, url, filename):
        try:
            response = self.session.get(url, timeout=30)
            response.raise_for_status()

            filepath = self.save_dir / filename
            with open(filepath, 'wb') as f:
                f.write(response.content)

            print(f'✓ Downloaded: {filename}')
            return True
        except Exception as e:
            print(f'✗ Failed to download {filename}: {e}')
            return False

    def scrape_unsplash(self, query, count=10):
        print(f'\n=== Scraping Unsplash: {query} ===')

        api_url = f'https://unsplash.com/s/photos/{query.replace(" ", "-")}'

        search_url = 'https://unsplash.com/napi/search/photos'
        params = {
            'query': query,
            'per_page': count,
            'orientation': 'landscape'
        }

        try:
            response = self.session.get(search_url, params=params, timeout=30)
            response.raise_for_status()
            data = response.json()

            results = data.get('results', [])
            print(f'Found {len(results)} images')

            for idx, photo in enumerate(results):
                regular_url = photo['urls']['regular']
                filename = f'{query.replace(" ", "_")}_{idx+1}.jpg'
                self.download_image(regular_url, filename)
                time.sleep(1)

        except Exception as e:
            print(f'Error scraping Unsplash: {e}')

    def scrape_picsum(self, count=10):
        print(f'\n=== Scraping Picsum Photos ===')

        for i in range(1, count + 1):
            url = f'https://picsum.photos/800/600?random={i}'
            filename = f'picsum_{i}.jpg'
            self.download_image(url, filename)
            time.sleep(0.5)

    def scrape_landscape(self, count=15):
        print(f'\n=== Scraping Landscape Images ===')

        queries = [
            'mountain sunrise',
            'ancient town',
            'lake reflection',
            'theme park',
            'hiking trail',
            'museum',
            'night market',
            'flower field'
        ]

        for query in queries[:count]:
            self.scrape_unsplash(query, count=2)
            time.sleep(2)

def main():
    scraper = ImageScraper(save_dir='travel-guide/images')

    print('Starting image scraping for travel guide project...')
    print('=' * 50)

    scraper.scrape_landscape(count=8)

    print('\n' + '=' * 50)
    print('Scraping completed!')
    print(f'Images saved to: {scraper.save_dir.absolute()}')

    total_images = len(list(scraper.save_dir.glob('*.jpg'))) + len(list(scraper.save_dir.glob('*.png')))
    print(f'Total images downloaded: {total_images}')

if __name__ == '__main__':
    main()

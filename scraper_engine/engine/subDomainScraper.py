import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

# Function to get all URLs from a website that contains the same domain
def get_all_urls(url):
    parsed_url = urlparse(url)
    domain = parsed_url.netloc
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, "html.parser")
        links = soup.find_all('a', href=True)
        urls = set()
        for link in links:
            href = link['href']
            full_url = urljoin(url, href)
            if domain in urlparse(full_url).netloc:
                urls.add(full_url)
        
        return urls
    else:
        # print(f"Error: Unable to fetch the website (Status Code: {response.status_code})")
        return []


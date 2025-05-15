import sys
import os
import json
from engine.web_scraper import WebScraper

def main():
    mode = sys.argv[1] #custom or product
    url = sys.argv[2]
    auth = sys.argv[3].lower() == "true"
    login_url = sys.argv[4] if auth else None
    email = sys.argv[5] if auth else None
    password = sys.argv[6] if auth else None
    product_name = sys.argv[7] if mode == "product" else None
    product_code = sys.argv[8] if mode == "product" else None
    
    
    scraper = WebScraper()
    
    try:
        if mode == "custom":
            content = scraper.scrape_content(
                url=url,
                requires_auth=auth,
                login_url=login_url,
                email=email,
                password=password
            )
            
            if content:
                # Return JSON response
                print(json.dumps(content))
                sys.exit(0)
            else:
                print(json.dumps({"error": "Scraping failed"}))
                sys.exit(1)
        elif mode == "product":
            content = scraper.TradeMarkScrapper(product_name=product_name, product_code=product_code, email=email, password=password)
            if content:
                # Return JSON response
                print(json.dumps(content))
                sys.exit(0)
            else:
                print(json.dumps({"error": "Scraping failed"}))
                sys.exit(1)
    except Exception as e:
        print(json.dumps({"error": "Scraping failed"}))
        sys.exit(1)

if __name__ == "__main__":
    main()



# import sys
# import os
# from engine.web_scraper import WebScraper
# scraper = WebScraper()
 
# auth = "false" # false or true
# product_name = "Live asses" #for some reason it removes the first character
# product_code = None
# email  = "drodriguez@tecnaliacolombia.org"
# password ="Tecnalia"
# content = scraper.TradeMarkScrapper(product_name=product_name, product_code=product_code, email=email, password=password)

# if content:
#     print(content)
# else:
#     print('scrapping failed')
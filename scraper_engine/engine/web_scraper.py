# from selenium import webdriver
# from selenium.webdriver.chrome.options import Options
# from selenium.webdriver.common.by import By
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC
# from selenium.common.exceptions import TimeoutException
# from bs4 import BeautifulSoup
# from engine.parse import clean_body_content
# import requests
# from urllib.parse import urljoin, urlparse
# import logging
# import random
# # import json
# from datetime import datetime
# import time
# # import os





from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from bs4 import BeautifulSoup
from engine.parse import clean_body_content
import requests
from urllib.parse import urljoin, urlparse
import logging
import random
from datetime import datetime
import time


class WebScraper:
    def __init__(self):
        self.driver = None
        self.setup_logging()

    def setup_logging(self):
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s'
        )
        self.logger = logging.getLogger(__name__)

    # Function to initialize Chrome WebDriver   
    def initialize_driver(self):
        """Initialize Chrome WebDriver with options"""
        options = Options()
        options.add_argument('--headless')  # Run in headless mode
        options.add_argument('--disable-gpu')
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument('disable-infobars')
        options.add_argument("--disable-extensions")
        
        # Specify the path to ChromeDriver 
        chromedriver_path = '/usr/local/bin/chromedriver'  

        # Initialize the driver
        # self.driver = webdriver.Chrome(executable_path=chromedriver_path, options=options)
        self.driver = webdriver.Chrome(options=options)
        self.driver.implicitly_wait(random.randint(5, 15))
        
    # Function to get all URLs from a website that contains the same domain     
    def get_all_urls_with_BeautifulSoup(self, url):
        try:
            #print("Getting subdomains...with beautiful soup")
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
                #print(f"Error: Unable to fetch the websites with BeatuifulSoup (Status Code: {response.status_code})")
                return False
        except Exception as e:
            #print(f"Error: Unable to fetch the websites with BeatuifulSoup (Error: {e})")
            return False
        
    def get_all_urls_with_selenium(self, url):
        try:
            #print("Getting subdomains...with selenium")
            try:
                soup = self.fixload(url)
                links = soup.find_all('a', href=True)
                urls = set()
                for link in links:
                    href = link['href']
                    full_url = urljoin(url, href)
                    if urlparse(url).netloc in urlparse(full_url).netloc:
                        urls.add(full_url)
                
                return urls
            except Exception as e:
                #print(f"Error: Unable to fetch the websites with selenium (Error: {e})")
                return False
        except Exception as e:
            #print(f"Error: Unable to fetch the websites with selenium (Error: {e})")
            return False

    # Function to get all URLs from a website that contains the same domain
    def getSubDomains(self, url):
        """Get subdomains using BeautifulSoup first, then Selenium if needed"""
        
        # Try BeautifulSoup method first
        urls = self.get_all_urls_with_BeautifulSoup(url)
        if urls:
            return urls
            
        # If BeautifulSoup fails, try Selenium
        urls = self.get_all_urls_with_selenium(url)
        if urls:
            return urls
            
        # If both methods fail, log error and exit
        # self.logger.error("Failed to get subdomains using both BeautifulSoup and Selenium")
        exit(1)
        

    def scrape_content(self, url, requires_auth=False, login_url=None, email=None, password=None):
        """Main scraping function"""
        try:
            self.initialize_driver()
            result = {
            "url": url,
            "timestamp": datetime.now().isoformat(),
            "subdomains": [],
            "scraped_data": {}
            }
            
            if requires_auth:
                if not all([login_url, email, password]):
                    raise ValueError("Login credentials required but not provided")
                
                login_success = self.login(login_url, email, password)
                if not login_success:
                    raise Exception("Login failed")
            
            # Navigate to target URL
            # self.logger.info(f"Navigating to {url}")
            subdomain_set = self.getSubDomains(url)
            subdomains = list(subdomain_set)[:4]
            subdomains.append(url)
            subdomains = False #removed subdomain for now
            
            if not subdomains:
                # self.logger.warning("No subdomains found. Attempting to scrape main URL only.")
                subdomains = [url]
            
            
            
            # Save all subdomains to result
            result["subdomains"] = subdomains
            # self.logger.info(f"Found {len(subdomains)} domains to scrape")
            
            for subdomain in subdomains:
                try:
                    # self.logger.info(f"Attempting to scrape: {subdomain}")
                    page_source = self.fixload(subdomain)
                    
                    if not page_source or not page_source.body:
                        # self.logger.warning(f"No content found for {subdomain}, skipping...")
                        continue
                    
                    cleaned_content = clean_body_content(page_source)
                    if cleaned_content:
                        result["scraped_data"][subdomain] = cleaned_content
                        # self.logger.info(f"Successfully scraped content from {subdomain}")
                        
                except TimeoutException:
                    # self.logger.error(f"Timeout while loading {subdomain}, skipping...")
                    continue
                except Exception as e:
                    # self.logger.error(f"Error scraping {subdomain}: {str(e)}, skipping...")
                    continue
            
            if not result["scraped_data"]:
                # self.logger.error("No content could be scraped from any domain")
                return None
    
            return result
            
        except Exception as e:
            # self.logger.error(f"Scraping failed: {str(e)}")
            return None
            
        finally:
            if self.driver:
                self.driver.quit()    
    
    
    # incase of js rendering and slow load time error
    def fixload(self, url):
        try:
            self.driver.get(url)
            # Wait for content to load
            WebDriverWait(self.driver, random.randint(5, 10)).until(
                EC.presence_of_element_located((By.TAG_NAME, "body"))
            )
        except TimeoutException:
            self.driver.execute_script("window.stop();")
            
        return BeautifulSoup(self.driver.page_source, "html.parser")
    
    
    def login(self, login_url, email, password):
        """Handle website login"""
        try:
            # self.logger.info("Attempting login...")
            self.driver.get(login_url)

            # Wait and try different selectors for email/username field
            email_field = self._wait_for_element(
                "input[type='email']",
                "input[type='text'], input[name='username'], input[name='user-name'], input[name='email']"
            )
            if email_field is None:
                return False

            email_field.send_keys(email)

            # Wait for password field and enter password
            password_field = self._wait_for_element("input[type='password']")
            if password_field is None:
                return False

            password_field.send_keys(password)

            # Find and click login button with multiple possible selectors
            login_button = None
            try:
                # Try finding button by multiple possible link texts
                login_button = self.driver.find_element(By.LINK_TEXT, "Login")
            except:
                try:
                    login_button = self.driver.find_element(By.PARTIAL_LINK_TEXT, "Login")
                except:
                    try:
                        login_button = self.driver.find_element(By.PARTIAL_LINK_TEXT, "Log In")
                    except:
                        try:
                            login_button = self.driver.find_element(By.PARTIAL_LINK_TEXT, "Sign In")
                        except:
                            # Fallback to button type submit
                            login_button = self.driver.find_element(By.CSS_SELECTOR, "input[type='submit']")
            
            if login_button is None:
                # self.logger.error("Could not find login button.")
                return False

            login_button.click()
            # self.logger.info("Login successful")
            return True

        except Exception as e:
            # self.logger.error(f"Login failed: {e}")
            return False

    def _wait_for_element(self, css_selector, fallback_selector=None, is_clickable=False):
        """Helper function to wait for an element."""
        try:
            if fallback_selector:
                element = WebDriverWait(self.driver, random.randint(5, 10)).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, fallback_selector))
                )
            else:
                element = WebDriverWait(self.driver, random.randint(5, 10)).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, css_selector))
                )

            if is_clickable:
                WebDriverWait(self.driver, random.randint(5, 10)).until(
                    EC.element_to_be_clickable(element)
                )
            return element

        except Exception as e:
            # self.logger.error(f"Could not find element with selector {css_selector}: {str(e)}")
            return None


    def TradeMarkScrapper(self, product_name = None, product_code = None, email = None, password = None):
        main_url = "https://www.trademap.org/Index.aspx"
        login_url = "https://idserv.marketanalysis.intracen.org/Account/Login?"
        
        try:
            self.initialize_driver()
            result = {
            "url": main_url,
            "product_name": product_name,
            "product_code": product_code,
            "timestamp": datetime.now().isoformat(),
            "scraped_data": {}
            }
            
            login_success = self.LoginToTradeMap(login_url, email, password)
            if not login_success:
                raise Exception("Login failed")
            
            # Navigate to target main URL
            self.driver.get(main_url)
            
            # Wait for DOM to be fully loaded
            WebDriverWait(self.driver, 10).until(
                lambda driver: driver.execute_script("return document.readyState") == "complete"
            )
            


            # Check for popup and close it if present
            try:
                popup_close = WebDriverWait(self.driver, 5).until(
                    EC.presence_of_element_located((By.ID, "ctl00_MenuControl_button1"))
                )
                if popup_close:
                    popup_close.click()
                    time.sleep(2)  # Brief pause after closing popup
            except:
                pass  # Continue if popup is not found
            
            
            
            # Click on Exports radio button
            try:
                export_radio = WebDriverWait(self.driver, 8).until(
                    EC.presence_of_element_located((By.ID, "ctl00_PageContent_RadioButton_TradeType_Export"))
                )
                
                # Use JavaScript to click since it might be hidden or need special handling
                self.driver.execute_script("arguments[0].click(); ToggleRadioButton(arguments[0]); OnTradeTypeChangingHandler();", export_radio)
                
                # Small delay to let the change take effect
                time.sleep(2)
            except Exception as e:
                pass
            
            # self.driver.implicitly_wait(random.randint(5, 13))
            time.sleep(random.randint(3, 7)) 
            
            
            

            # Locate the input field and send "product" to it
            input_field = self.driver.find_element(By.ID, 'ctl00_PageContent_RadComboBox_Product_Input')
            input_field.send_keys('_'+product_name)
            
                
            # Locate the first dropdown item
            first_dropdown_item = self.driver.find_element(By.XPATH, '//*[@id="ctl00_PageContent_RadComboBox_Product_DropDown"]/div[1]')
            if first_dropdown_item.text == "Loading...":
                time.sleep(random.randint(5, 10)) 
                first_dropdown_product = self.driver.find_element(By.ID, 'ctl00_PageContent_RadComboBox_Product_c0')
                # second_dropdown_product = self.driver.find_element(By.ID,'ctl00_PageContent_RadComboBox_Product_c1')
                # Get the text from the first dropdown item
                dropdown_text = first_dropdown_product.text
                # dropdown_text2 = second_dropdown_product.text

                # Clean product name by removing leading underscore if present
                # cleaned_product_name = product_name.lstrip('_')
                
                # print(f"Dropdown text1: {dropdown_text}")
                # # print(f"Dropdown text2: {dropdown_text2}")
                # print(f"Searching for: {cleaned_product_name}")
            
           
                # Click the dropdown item
                first_dropdown_product.click()
                
                time.sleep(random.randint(5, 10))
                trade_button = WebDriverWait(self.driver, random.randint(5, 10)).until(
                    EC.element_to_be_clickable((By.ID, 'ctl00_PageContent_Button_TradeIndicators'))
                )
                    
                #click indicators
                trade_button.click()
                result["scraped_data"][main_url] = self.get_country_links()
                return result
            else:
                return False
        
        except Exception as e:
            # self.logger.error(f"Login failed: {e}")
            return False
        
    def get_country_links(self):
        """Extract country links from trade table and get their data"""
        try:
            # Wait for table to be present
            WebDriverWait(self.driver, 15).until(
                EC.presence_of_element_located((By.ID, 'ctl00_PageContent_MyGridView1'))
            )

            # Find all country links in table (skip World - first item)
            country_links = self.driver.find_elements(
                By.CSS_SELECTOR, 
                'table#ctl00_PageContent_MyGridView1 a[id*="LinkButton_Country"]'
            )[1:6]  # Get items 2-6
            
            # Store results for each country
            countries_data = []
            
            country_names = [link.text.strip() for link in country_links]

            # Process each country link
            for country in country_names:
                try:
                    
                    # Click the country link
                    # Find and click country link by exact text
                    country_link = WebDriverWait(self.driver, 10).until(
                        EC.element_to_be_clickable((By.LINK_TEXT, country))
                    )
                    country_link.click()
                    time.sleep(random.randint(3, 5))
                    
                    # Scrape the data for this country
                    country_data = self.scrapeTableTradeMap()
                    
                    # Add to results
                    countries_data.append({
                        "country": country,
                        "data": country_data if country_data else False
                    })
                    
                    # Go back to previous page
                    self.driver.back()
                    
                    # Wait for main table to reload
                    WebDriverWait(self.driver, 15).until(
                        EC.presence_of_element_located((By.ID, 'ctl00_PageContent_MyGridView1'))
                    )
                    
                    # Small delay before processing next country
                    time.sleep(random.randint(2, 4))
                
                except Exception as e:
                    countries_data.append({
                        "country": country,
                        "data": False
                    })
                    # Try to go back if error occurs
                    self.driver.back()
                    time.sleep(2)

            return countries_data

        except Exception as e:
            return []
    def scrapeTableTradeMap(self):
        try:
            # Wait until the table is found
            WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.ID, 'ctl00_PageContent_MyGridView1'))
            )

            # Parse the page with BeautifulSoup
            soup = BeautifulSoup(self.driver.page_source, 'html.parser')
            table = soup.find('table', {'id': 'ctl00_PageContent_MyGridView1'})
            
            if table:
                # Get headers from the second header row (skip first row)
                headers = []
                header_row = table.find_all('tr', style=lambda x: x and 'background-color:#5D7B9D' in x)[1]
                for th in header_row.find_all('th'):
                    anchor = th.find('a')
                    if anchor:
                        headers.append(anchor.text.strip())
                    else:
                        headers.append(th.text.strip())

                # Get only first 10 data rows (skip header rows)
                data_rows = []
                valid_rows = [row for row in table.find_all('tr')[3:] if len(row.find_all(['td'])) >= 2][:10]
                
                for row in valid_rows:
                    row_data = {}
                    cells = row.find_all(['td'])
                    
                    # Get country name from second column
                    country_link = cells[1].find('a')
                    if country_link:
                        row_data['Importers'] = country_link.text.strip()
                    
                    # Get numeric values from remaining cells
                    for i, cell in enumerate(cells[2:], 2):
                        if i-2 < len(headers):
                            value = cell.text.strip()
                            if value.replace(',', '').replace('.', '').replace('-', '').isdigit():
                                value = value.replace(',', '')
                            row_data[headers[i-2]] = value
                    
                    data_rows.append(row_data)
                return data_rows
                
            else:
                return False

        except Exception as e:
            return False
    
    def LoginToTradeMap(self,login_url, email, password):
        try:
            self.driver.get(login_url)
            self.driver.implicitly_wait(random.randint(3,7))
            
            # Find the email input field and enter the email
            email_field = self.driver.find_element(By.ID, 'Username')  
            email_field.send_keys(email)
            
            # Find the password input field and enter the password
            password_field = self.driver.find_element(By.ID, 'Password')
            password_field.send_keys(password)
            time.sleep(random.randint(4, 7))
            
            # Find the "Remember Me" checkbox and click it
            # remember_me_checkbox = self.driver.find_element(By.ID, 'RememberLogin') 
            # remember_me_checkbox.click()
                
            # Find the login button and click it
            login_button = self.driver.find_element(By.CSS_SELECTOR, 'button.btn.btn-lg.btn-block.btn-primary.mb-1[value="login"]')
            # Execute JavaScript to simulate a click event using dispatchEvent
            self.driver.execute_script("""
                var loginButton = arguments[0];
                var event = new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                loginButton.dispatchEvent(event);
            """, login_button)
            
            self.driver.implicitly_wait(random.randint(5, 10))
            return True 
        
        except Exception as e:
            return False
            return False
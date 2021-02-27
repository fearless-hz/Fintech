from selenium import webdriver
driver = webdriver.Chrome('./chromedriver')
driver.implicitly_wait(3)
driver.get('https://news.naver.com/main/read.nhn?mode=LSD&mid=shm&sid1=105&oid=009&aid=0004754939')
title = driver.find_element_by_id('articleTitle')
body = driver.find_element_by_id('articleBodyContents')
print(body.text)
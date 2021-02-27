# -*- coding: utf-8 -*-
from selenium import webdriver
from selenium.webdriver.support.ui import Select

driver = webdriver.Chrome('./chromedriver')
driver.get('https://www.aia.co.kr/ko/our-products/medical-protection/non-par-denteal-health-plan.html#')

#남자 여자 선택 click / 생년월일 입력 send_key
woman = driver.find_element_by_xpath(
    '//*[@id="calculator-container-form"]/div[1]/div[2]/div/div[1]/div/div[3]/div[1]/div[1]'
    )
woman.click()
birthday = driver.find_element_by_xpath('//*[@id="aia644363719"]')
birthday.send_keys('19980416')
cal=driver.find_element_by_xpath('//*[@id="btn806817556"]')
cal.click()
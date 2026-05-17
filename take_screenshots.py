from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time, os

opts = Options()
opts.add_argument('--headless')
opts.add_argument('--window-size=1440,900')
opts.add_argument('--no-sandbox')
driver = webdriver.Chrome(options=opts)

base = r'c:\Users\lucas\Documents\EloGroup\2026\01_prototipo_assiste\temporary screenshots'

driver.get('http://localhost:3000')
time.sleep(1.2)

# Farol de Metas
driver.execute_script("document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active')); document.querySelectorAll('.section').forEach(s=>s.classList.remove('active')); var el=document.querySelector('[onclick*=farol]'); el.classList.add('active'); document.getElementById('sec-farol').classList.add('active'); document.getElementById('tbar-title').textContent='Farol de Metas';")
time.sleep(0.8)
driver.save_screenshot(os.path.join(base, 'screenshot-2-farol.png'))
print('Farol saved')

# Orcamento
driver.execute_script("document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active')); document.querySelectorAll('.section').forEach(s=>s.classList.remove('active')); var el=document.querySelector('[onclick*=orcamento]'); el.classList.add('active'); document.getElementById('sec-orcamento').classList.add('active'); document.getElementById('tbar-title').textContent='Planejamento Orcamentario';")
time.sleep(0.8)
driver.save_screenshot(os.path.join(base, 'screenshot-3-orcamento.png'))
print('Orcamento saved')

driver.quit()
print('All done')

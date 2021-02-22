import requests
import logging
import threading
import time

def thread_function(name):
    for _ in range(5):
        a = requests.get("http://localhost:4202/api/v1/get_results?_id=BAZOOKA")
  
if __name__ == "__main__":
    thread_pool = []

    for i in range(3):
        thread_pool.append(threading.Thread(target=thread_function, args=(1,)))
    
    start =  time.time()
    for th in thread_pool:
        th.start()

    for th in thread_pool:
        th.join()

    end_time =  time.time() - start


    print(f"Exec time = {end_time}")


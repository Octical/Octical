from flask import Flask, jsonify, request
import dotenv
import vercel_blob
from flask_cors import CORS, cross_origin

from PIL import Image
import requests 
from io import BytesIO
from ultralytics import YOLO

app = Flask(__name__)
CORS(app, support_credentials=True)
dotenv.load_dotenv()

model = YOLO("./best.pt")

def search_image_for_people(url):
    image_results = model.predict(source = Image.open(BytesIO((requests.get(url, verify=False)).content)), save = False, show=False, conf=0.4)
    p_count = 0
    for image_result in image_results:
        for image_box in image_result.boxes:
            class_id = int(image_box.cls[0])
            if model.names[class_id] == "person":
                p_count += 1
    return p_count

def search_in_section(section):
    resp = vercel_blob.list()
    # print(resp)
    blobs = resp['blobs']
    people_count = -1
    time_at = ""
    for blob in blobs:
        path = blob['pathname']
        if section in path:
            p_time = blob['uploadedAt']
            if time_at=="":
                time_at = p_time
            else:
                for x in range(0, len(p_time)):
                    if p_time[x].isdigit():
                        if len(time_at)<=x or (not time_at[x].isdigit()):
                            break
                        if int(p_time[x]) > int(time_at[x]):
                            time_at = p_time
                            break
                        elif int(p_time[x]) < int(time_at[x]):
                            break
    for blob in blobs:
        url, path = blob['url'], blob['pathname']
        if section in path:
            p_time = blob['uploadedAt']
            if time_at==p_time:
                people_count = search_image_for_people(url)
                break
    
    if time_at != "":
        print({"people": people_count, "time": time_at})
        return jsonify({"people": people_count, "time": time_at})
    else:
        print({"people": people_count, "time": time_at})
        return 'No Data Found'
    
@cross_origin(supports_credentials=True)
@app.route('/gym')
def gym():
    return search_in_section('gym/')

@app.route('/library')
def library():
    return search_in_section('library/')

@app.route('/laundry')
def laundry():
    return search_in_section('laundry/')

@app.route('/pool_table')
def pool_table():
    return search_in_section('pool_table/')


if __name__ == '__main__':
    app.run()
    

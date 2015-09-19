import csv
import json

with open("skills.csv", "r") as csv_file:
    with open("skills.json", "w") as json_file:
        fieldnames = ("id", "name")
        reader = csv.DictReader(csv_file, fieldnames)
        json_file.write(json.dumps({"results": [{"id": skill["id"], "name": skill["name"]} for skill in reader]}))
        print "Done"

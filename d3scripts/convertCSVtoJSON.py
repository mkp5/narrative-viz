import csv, json
csvfile = "countries-life-expectancy.csv"
jsonfile = "countries.json"

data = {}
with open(csvfile) as cfile:
    csvReader = csv.DictReader(cfile)
    tmp2018 = 0;
    tmp1962 = 0;
    change = 0;

    for rows in csvReader:
        #print(rows)
        id = rows['country']
        if (rows['year'] == '1962'):
            tmp1962 = float(rows['value'])
        if(rows['year'] == '2018'):
            tmp2018 = float(rows['value'])
            if tmp1962 > 0.0 and tmp2018 > 0.0:
                change = (tmp2018 - tmp1962) / tmp1962
                print(change * 100)
        data[id] = rows


with open(jsonfile, 'w') as jsonFile:
    jsonFile.write(json.dumps(data, indent=4))


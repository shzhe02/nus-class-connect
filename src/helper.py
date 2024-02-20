import json
import os

def extract_module_info_from_json(json_file):
    with open(json_file, 'r') as f:
        module_list = json.load(f)

    extracted_info = []
    for module in module_list:
        module_info = module["moduleCode"] + " " + module["title"]
        extracted_info.append(module_info)
    return extracted_info

def save_to_file(data, filename):
    with open(filename, 'w') as f:
        for item in data:
            f.write("%s\n" % item)

if __name__ == "__main__":
    # Get the path to the current Python script file
    current_directory = os.getcwd()

    # # Path to the JSON file containing module data
    json_file = current_directory + "/src/modules.json"
    
    # Extract module information from the JSON file
    extracted_modules = extract_module_info_from_json(json_file)
    
    # Save extracted module information to another file
    save_to_file(extracted_modules, 'extracted_modules.txt')

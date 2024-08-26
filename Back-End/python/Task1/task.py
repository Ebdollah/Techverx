import json
from utils import generate_short_uuid

class Task:
    def __init__(self):
        self.file_path = 'example.json'
        self.task_list = self.load_tasks()

    def load_tasks(self):
        try:
            with open(self.file_path, 'r', encoding='utf-8') as file:
                return json.load(file)
        except (FileNotFoundError, json.JSONDecodeError):
            return []

    def save_tasks(self):
        with open(self.file_path, 'w', encoding='utf-8') as file:
            json.dump(self.task_list, file, indent=4)

    def add_task(self):
        task_name = input("Task Name: ")
        task_desc = input("Task Description: ")
        task_id = generate_short_uuid()

        new_task = {
            "taskId": task_id,
            "taskName": task_name,
            "taskDesc": task_desc,
            "markCompleted": False
        }
        self.task_list.append(new_task)
        self.save_tasks()

    def list_tasks(self):
        if not self.task_list:
            print("No tasks available.")
        else:
            for task in self.task_list:
                status = "Completed" if task["markCompleted"] else "Incomplete"
                print(f"ID: {task['taskId']} | Name: {task['taskName']} | Description: {task['taskDesc']} | Status: {status}")

    def delete_task(self):
        task_id = input("Enter Task ID to delete: ")
        self.task_list = [task for task in self.task_list if task['taskId'] != task_id]
        self.save_tasks()

    def mark_task_completed(self):
        task_id = input("Enter Task ID to mark as completed: ")
        for task in self.task_list:
            if task["taskId"] == task_id:
                task["markCompleted"] = True
                break
        self.save_tasks()

    def terminate(self):
        self.save_tasks()
        print("All tasks saved and program exited.")
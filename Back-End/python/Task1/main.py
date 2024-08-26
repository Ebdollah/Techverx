from task import Task

def main():
    task_manager = Task()
    menu = """
    Task Manager
    1. Add Task
    2. Delete Task
    3. Mark Task as Completed
    4. List Tasks
    5. Exit
    """
    while True:
        print(menu)
        choice = input("Choose an option: ")

        if choice == '1':
            task_manager.add_task_in_file()
        elif choice == '2':
            task_manager.delete_task()
        elif choice == '3':
            task_manager.mark_status()
        elif choice == '4':
            task_manager.get_tasks()
        elif choice == '5':
            task_manager.terminate()
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
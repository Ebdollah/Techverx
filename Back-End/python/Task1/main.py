from task import Task

def main():
    t = Task()
    print("Enter 1 to add and 2 to show tasks and 0 to exit \n")
    while True:
        try:
            value = int(input("Enter value: "))
        except:
            print("Entered wront input")
        if(value == 1):
            t.add_task()
        if(value == 2):
            t.get_tasks()
        if(value == 3):
            t.get_by_id()
        if(value == 0):
            print("Program exited")
            break

if __name__ == "__main__":
    main()

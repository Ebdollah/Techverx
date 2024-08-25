class Task:
    task_list = []
    task_counter = 0
    def _init_(self, task_name = '', task_disc = '') -> None:
        self.id = Task.task_counter
        self.name = task_name
        self.description = task_disc
        # Task.task_counter += 1
        # Task.task_list.append(tuple(task_name, task_disc))
    
    def add_task(self):
        task_namee = input("Task Name: ")
        task_desc = input("Task description: ")
        task_id = Task.task_counter
        # Task.task_list.append([task_id, task_namee, task_desc])
        Task.task_list.append(
            {
                "taskId" : task_id,
                "taskName" : task_namee,
                "taskDesc" : task_desc
            }
        )
        Task.task_counter += 1 

    def get_tasks(self):
        for task in Task.task_list:
            print(task)

    def get_by_id(self):
        t_id = int(input("Enter ID of task: "))
        return t_id in Task.task_list[0]
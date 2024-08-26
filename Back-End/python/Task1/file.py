arr = [
    {'taskId': 0, 'taskName': 'we', 'taskDesc': 'werwerwer'},
{'taskId': 1, 'taskName': 'ew', 'taskDesc': 'sfsfsdfsdf'}
]


id = 1
# print(id in arr['taskId'])
print([task for task in arr if id == task['taskId']]) 
# print(arr[0]['taskId'])
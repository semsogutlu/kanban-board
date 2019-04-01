# Kanban
Kanban Board!

## How to install
- Install [yarn](https://yarnpkg.com/en/)
- Run `yarn` and wait for the installation to finish
- Then run `yarn run build`
- Open `index.html` in your browser
- Add Tasks!
- If you don't wanna install locally, you can run it online [here](https://semsogutlu.github.io/kanban/src/index.html)


## How it works?
- Click on "Create Task" to add a new task
- Click on task to edit a specific task
- You can delete, edit or move the task
- Tasks are sorted by creatin time


## TODOs
- Make swimlanes configurable
- Make task actions configurable
- Drag and drop support of the tasks

## Under the hood
- This project is vanilla JS. It only depends on one library to run and babel and webpack to build.
- Custom observer pattern is implemented. More info [here](https://pawelgrzybek.com/the-observer-pattern-in-javascript-explained/)
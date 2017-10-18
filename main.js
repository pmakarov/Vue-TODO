Vue.component('todo-item', {
    props: ['todo'],
    template: '<div class="panel-block"><div class="checkbox is-success is-circular"><input type="checkbox" class="styled" :checked="todo.completed"> {{ todo.description }}</div></div>'
  });

  var app = new Vue({
    el: '#root',

    data: {
      activeTabIndex: 0,
      isLoading: false,
      disabled: false,
      seen: true,
      submitted: false,
      todo_text: "",
      tabs: [
        { id: 0, text: 'All', active: true },
        { id: 1, text: 'Complete', active: false },
        { id: 2, text: 'Incomplete', active: false },
        ],
      tasks: [
        { id: 1, description: 'Go to the store', completed: true },
        { id: 2, description: 'Finish the screencast', completed: false },
        { id: 3, description: 'Make donation', completed: false },
        { id: 4, description: 'Clear inbox', completed: false },
        { id: 5, description: 'Make dinner', completed: false },
        { id: 6, description: 'Clean room', completed: true },
      ]
    },

    methods: {

      toggleTab($event) {
        //console.log($event.target.text.trim(' '));
        let tab_name = $event.target.text.trim(' ');
        for (var i = 0; i < this.tabs.length; i++) {
            this.tabs[i].active = false;
            if ( this.tabs[i].text == tab_name) {
                this.tabs[i].active = true;
                this.activeTabIndex = i;
            }
        }

        // let merp = this.tabs.findIndex(x => x.text == $event.target.text.trim(' '));
        // console.log(merp);
      },

      validateInput() {
        this.submitted = true;
        if ( this.todo_text === "") {
            return false;
        }
        else {
            this.addTodo(this.todo_text);
        }
      },

      addTodo() {
        this.tasks.push({'description': this.todo_text, 'completed':false, 'id': this.tasks.length + 1})
        this.todo_text = "";
        this.submitted = false;

      }
    },

    mounted: function() {
      this.disabled = false;
      this.tabs[0].active = true;
      this.activeTabIndex = 0;
      this.submitted = false;
    },

    computed: {
      incompleteTasks() {
        return this.tasks.filter(task => !task.completed);
      },
      completeTasks() {
        return this.tasks.filter(task => task.completed);
      },

      currentTasks() {
        if (this.activeTabIndex == 0) {
            return this.tasks;
        }
        else if ( this.activeTabIndex == 1) {
            return this.tasks.filter(task => task.completed);
        }
        else if ( this.activeTabIndex == 2) {
            return this.tasks.filter(task => !task.completed);
        }
      },

      handleNoData() {
         if (this.todo_text == "") {
            return true;
         }
         else return false;
      },

      resetTodo() {
        return this.task = [];
      }
    }

  });

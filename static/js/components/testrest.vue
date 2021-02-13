<template>
    <div style="border: red solid 2px;">
        testrest.vue<br>
        <button @click="onCreate">Create</button>
        <button @click="onRead">Read</button>
        <button @click="onUpdate">Update</button>
        <button @click="onDelete">Delete</button>
        <br>
        <b>Resource</b><br>
        url:<br> <input v-model="project.url" style="width: 80%;" /><br>
        name:<br> <input v-model="project.name" style="width: 80%;" /><br>
    </div>
</template>

<script>
    export default {
        data() { return {
            project: {
                url: 'http://127.0.0.1:8000/api/v1/projects/1',
                name: '',
                owners: ['http://127.0.0.1:8000/api/v1/users/1/'],
                admins: [],
                clients: [],
                partners: [],
            }
        }},
        methods: {
            onCreate(){
                this.$avrest.create('http://127.0.0.1:8000/api/v1/projects/', this.project, (success, data) => {
                    console.log('Create finished! success = ' + success + ', data = ');
                    if (success) {
                        console.log(data);
                        this.project = data;
                    }
                });
            },
            onRead(){
                this.$avrest.read(this.project.url, (success, data) => {
                    console.log('Read finished! success = ' + success + ', data = ');
                    console.log(data);
                    if (success) {
                        this.project = data;
                    }
                });
            },
            onUpdate(){
                this.$avrest.update(this.project.url, this.project, (success, data) => {
                    console.log('Update finished! success = ' + success + ', data = ');
                    console.log(data);
                    if (success) {
                        this.project = data;
                    }
                });
            },
            onDelete(){
                this.$avrest.delete(this.project.url, (success, data) => {
                    console.log('Delete finished! success = ' + success + ', data = ');
                    console.log(data);
                    if (success) {
                        this.project.url = 'http://127.0.0.1:8000/api/v1/projects';
                        this.project.name = '';
                    }
                });
            }
        },
        mounted() {
            console.log('vuetest mounted.')
            this.onRead();
        }
    }
</script>
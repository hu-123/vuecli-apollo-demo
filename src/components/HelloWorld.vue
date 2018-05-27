<template>
  <div class="hello">
    <input type="button" value="获取信息" @click="showTag">
    <el-table :data="tags" style="width:100%" align="center">
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="类型" prop="type"></el-table-column>
      <el-table-column label="姓名" prop="name" ></el-table-column>
    </el-table>
    <div>
      <el-input v-model="name" placeholder="输入姓名"></el-input>
      <el-button type="primary" slot="append" icon="el-icon-search" @click="addTag">插入信息</el-button>
    </div>
    <div>
      <el-input v-model="id" placeholder="输入id"></el-input>
      <el-button type="primary" slot="append" icon="el-icon-search" @click="remTag">插入信息</el-button>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";
import TAGS_QUERY from "@/graphql/tags.graphql";
import ADDTAG_MUTATION from "@/graphql/addtag.graphql";
import REMOVER_MUTATION from "@/graphql/remtag.graphql"
export default {
  name: "HelloWorld",
  data() {
    return {
      ping: "",
      type: "City",
      tags: [],
      name: "",
      newType: "",
      id:''
    };
  },
  apollo: {
    ping: {
      query: gql`
        query PingMssage($message: String!) {
          ping(message: $message)
        }
      `,
      //传参variables（）{return{}}用来传递可变参数每一次数据的改变都会进行一次请求
      variables: {
        message: "aaa"
      }
    }
  },
  methods: {
    showTag() {
      this.$apollo
        .query({
          query: TAGS_QUERY,
          variables: {
            type: this.type
          }
        })
        .then(res => {
          this.tags = res.data.tags;
        })
        .catch(err => {
          console.log(err);
        });
    },
    addTag() {
      this.$apollo.mutate({
        mutation: ADDTAG_MUTATION,
        variables:{
            type: this.type,
            label:this.name
        }
      })
      .then(res=>{
        
      this.$apollo
        .query({
          query: TAGS_QUERY,
          variables: {
            type: this.type
          }
        })
        .then(res => {
          this.tags = res.data.tags;
        })
        .catch(err => {
          console.log(err);
        });
      })
      .catch(err=>{
        console.log(err)
      })
    },
    remTag(){
      this.$apollo.mutate({
        mutation:REMOVER_MUTATION,
        variables:{
          id : this.id-0
        }
      })
      .then(res=>{
        console.log(res)
      })
      .catch(res=>{
        console.log(res)
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.el-input {
  width: 120px;
}
</style>

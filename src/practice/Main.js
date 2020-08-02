import React from "react";
import { connect } from "react-redux";
import { Fetchingstart } from "./actions/main";
import Datatable from 'react-bs-datatable';


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      move: "",
      tasks: [
        { name: "First", category: "task" },
        { name: "Second", category: "task" },
        { name: "Three", category: "task" },
        { name: "Four", category: "task" },
        { name: "Five", category: "task" },
        { name: "Six", category: "task" },
      ],
    };
    this.moveforward = this.moveforward.bind(this);
    this.movebackword = this.movebackword.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(Fetchingstart());
  }
  

  onDragOver = (event) => {
    event.preventDefault();
  };

  onDrop = (event,cat) => {
    let id = event.dataTransfer.getData("id");

    let tasks = this.state.tasks.filter((task) => {
      if (task.name == id) {
        task.category = cat;
      }
      return task;
    });

    this.setState({
      ...this.state,
      tasks,
    });
  };

  onDragStart = (event, id) => {
    event.dataTransfer.setData("id", id);
  };
  moveforward = () => {
    this.setState({ move: "forword" });
  };

  movebackword = () => {
    this.setState({ move: "backword" });
  };

  render() {
    
    const header = [
      { title: 'FULLNAME', prop: 'name',sortable: true,
      filterable: true },
      { title: 'PHONE', prop: 'phone', sortable: true },
      { title: 'USERNAME', prop: 'username', sortable: true },
      { title: 'EMAIL', prop: 'email', sortable: true },
    ];
    const customLabels = {
        prev: '<',
        next: '>',
        show: 'Display',
        entries: 'rows',
        noResults: 'There is no data to be displayed'
    };

    const classes = {
        table: 'table-striped table-hover',
      };

    var allList = this.props.alldata;
    console.log("allList",allList);

    if(allList.loading){
     var body= <h3>Please Wait ...</h3>
    }
    if(!allList.loading && allList.FetchData!==undefined ){
    var body=<Datatable tableHeaders={header} tableBody={allList.FetchData} rowsPerPage={2}
    rowsPerPageOption={[2, 5, 7, 10]} initialSort={{ prop: 'name', isAscending: true }} labels={customLabels}  classes={classes}/>;
    };

    var tasks = {
      task: [],
      done: [],
    };

    this.state.tasks.forEach((t) => {
      tasks[t.category].push(
        <li
          key={t.name}
          onDragStart={(e) => this.onDragStart(e, t.name)}
          draggable
          className="draggable"
          style={{ backgroundColor: t.bgcolor }}>
          {t.name}
        </li>
      );
    });



    return (

      <div className="tablepart" style={{ textAlign: "center" }}>
        <div className="table_part">
            {body}
        </div>
        <div className="container-drag">
          <div id={this.state.move == "forword" ? "forword" : "backword"}
                className="task"
                onDragOver={(e) => this.onDragOver(e)}
                onDrop={(e) => {
                this.onDrop(e, "task");
                }} >
                <ul>{tasks.task}</ul>
          </div>
          <div className="icons_section">
            <i className="fa fa-4x fa-play-circle"
              id={this.state.move == "forword" ? "icon_active" : ""}
              aria-hidden="true"
              onClick={this.moveforward} />
            <i className="fa fa-4x fa-play-circle"
              id={this.state.move == "backword" ? "icon_active" : ""}
              aria-hidden="true"
              onClick={this.movebackword} />
          </div>

          <div
            id={this.state.move == "forword" ? "backword" : "forword"}
            className="droppable"
            onDrop={(e) => this.onDrop(e, "done")}
            onDragOver={(ev) => this.onDragOver(ev)}  >
            <ul>{tasks.done}</ul>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatetToProps = (state) => {
  // console.log("state from form",state)
  return {
    alldata: state.MainReducer,
  };
};

export default connect(mapStatetToProps)(Main);

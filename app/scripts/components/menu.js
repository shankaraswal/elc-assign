/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 * 
 */
import React from 'react';
import axios from 'axios'

class Menu extends React.Component {

    /**
     * Main constructor for the Menu Class
     * @memberof Menu
     */
    constructor() {
        super();
        this.state = {
            showingSearch: false,
            mylist:'',
            filterlist:'',
            count:0
        };
        this.onSearch = this.onSearch.bind(this);
        this.showSearchContainer = this.showSearchContainer.bind(this);
    }

    /**
     * Shows or hides the search container
     * @memberof Menu
     * @param e [Object] - the event from a click handler
     */

    componentDidMount(){ 
        this.getData();
    }
    
    showSearchContainer (e){
            e.preventDefault();
            this.setState({
                showingSearch: !this.state.showingSearch
            });
        }

        /**
         * Calls upon search change
         * @memberof Menu
         * @param e [Object] - the event from a text change handler
         */

    getData(){
        return axios.get('http://localhost:3035')
        .then((res)=>{
            const { data } = res;
            this.setState({mylist: data})
        })
        .catch((err)=>{
            //  this.setState({isDataSend: true, isLoading:true})
        })
    }

    onSearch (e){
            let filterlist='';
            if(e.length > 0){
                filterlist= this.state.mylist.filter((item)=>{
                return (item.name).toLowerCase().search(e.toLowerCase()) !== -1;
              });
            }
            this.setState({filterlist, count:filterlist.length})
        }


    componentDidUpdate(){
    }
    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     * 
     * @returns JSX
     * @memberof App
    */
    render() {
          return (
            <header className="menu">
                <div className="menu-container">
                    <div className="menu-holder">
                        <h1>ELC</h1>
                        <nav>
                            <a href="#" className="nav-item">HOLIDAY</a>
                            <a href="#" className="nav-item">WHAT'S NEW</a>
                            <a href="#" className="nav-item">PRODUCTS</a>
                            <a href="#" className="nav-item">BESTSELLERS</a>
                            <a href="#" className="nav-item">GOODBYES</a>
                            <a href="#" className="nav-item">STORES</a>
                            <a href="#" className="nav-item">INSPIRATION</a>

                            <a href="#" onClick={e=>this.showSearchContainer(e)}>
                                <i className="material-icons search">search</i>
                            </a>
                        </nav>
                    </div>
                </div>
                <div className={(this.state.showingSearch ? "showing " : "") + "search-container"}>
                    <input type="text" onChange={(e) => this.onSearch(e.target.value)} />
                    <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                        <i className="material-icons close">close</i>
                    </a>


                    <div className="searchResults">
                        <h2 className="resultsCount">Total Records Count: {this.state.count} <hr /></h2>
                       
                        {(this.state.filterlist ||[]).map(item=>(
                                <div className="listBucket" key={item._id}>
                                <div className="body">
                                    <div className="imgBucket">
                                        <img src={item.picture} />
                                    </div>
                                    <div className="contentBucket">
                                        <h2>{item.name}</h2>
                                        <h3>Available: {item.isActive}</h3>
                                        <p className="price">Price: <b>{item.price}</b></p>
                                        <p className="tags">Tags: {(item.tags ||[]).map(i=>(
                                            <b key={i}>{i.toUpperCase()} </b>
                                        ))}</p>
                                        <p className="desc">{item.about}</p>
                                    </div>
                                    
                                </div>
                                </div>
                            ))}
                        </div>

                </div>
            </header>
        );
    }


}

// Export out the React Component
module.exports = Menu;
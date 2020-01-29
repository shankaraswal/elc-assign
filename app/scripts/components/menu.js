/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 * 
 */
import React, { Component } from 'react';
import axios from 'axios'

class Menu extends Component {

    /**
     * Main constructor for the Menu Class
     * @memberof Menu
     */
    constructor() {
        super();
        this.state = {
            showingSearch: false,
            showingSearchResults:false,
            mylist:'',
            filterlist:'',
            count:0,
            url :'http://localhost:3035'
        };
    }

    /**
     * Shows or hides the search container
     * @memberof Menu
     * @param e [Object] - the event from a click handler
     */

   componentDidMount(){ 
        //on component load: getting all records
       this.getData();
    }
    
    showSearchContainer (e){
            e.preventDefault();
            this.inpSearch.value = "";
            this.setState({
                showingSearch: !this.state.showingSearch,
                filterlist:'',
                count:0
            });
        }

     
        
    /**
     * Fn: to fetch data from node
     * @memberof Menu
     * @param : na
     */
    getData =async ()=>{
        return await axios.get('http://localhost:3035')
        .then((res)=>{
            const { data } = res;
            this.setState({mylist: data})
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    /**
     * Calls upon search change
     * @memberof Menu
     * @param e [Object] - the event from a text change handler
     */
    onSearch = e => {
            let filterlist='';

            //console.log(e, this.state.mylist)
             if(e.length > 0){
                this.setState({showingSearchResults:true})
                 filterlist= this.state.mylist.filter((item)=>{
                 return (item.name).toLowerCase().search(e.toLowerCase()) !== -1;
               });
             }
             else{
                this.setState({showingSearchResults:false})
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
        console.log(this.state.mylist)
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
                    <input type="text" ref={el => this.inpSearch = el} onChange={(e) => this.onSearch(e.target.value)} />
                    <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                        <i className="material-icons close">close</i>
                    </a>

                    {this.state.showingSearchResults && this.state.count > 0 ? (
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

                        ) : ''}

                   

                </div>
            </header>
        );
    }


}

// Export out the React Component
module.exports = Menu;
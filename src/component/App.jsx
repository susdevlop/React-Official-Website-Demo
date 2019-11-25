import React from 'react'
import cssobj from '@/css/Search';

// 假设是ajax的json信息
const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];


// input组件
class SearchBar extends React.Component{
  constructor(){
    super()
    this.onChangeHandle = this.onChangeHandle.bind(this)
    this.onClickHandle = this.onClickHandle.bind(this)
    this.state = {
      value:'',
    }
  }
  onChangeHandle(e){
    this.props.onSearch(e.target.value)
  }
  onClickHandle(e){
    this.props.showStock(e.target.value)
  }
  render(){
    return <div className={cssobj.SearchBar}>
      <input type="text" placeholder="Search..."  onInput={this.onChangeHandle}/>
      <div>
        <input type="checkbox" name="isStock" onClick={this.onClickHandle}/><label htmlFor="Only show products in stock">Only show products in stock</label>
      </div>
    </div>
  }
}
// 产品类别标题
function ProductCategoryRow(props){
  if(props.category){
    return <div id={cssobj.categorytitle}>
    {props.category} :
  </div>
  }
}
// 产品列表
function ProductRow(props){
  const li = props.categorymsg
  const category = li.map(item=>{
    if(item.stocked!=false){
      return <li key={item.name}>
        {item.name}&nbsp;&nbsp;{item.price}
      </li>
    }
    return <li key={item.name}>
        <span style={{color:'red'}}>{item.name}</span>&nbsp;&nbsp;{item.price}
    </li>
  })
  return <ul>
    {category}
  </ul>
}


// 根据不同类别排列
function ProductCategory(props){
  const isShow = props.isShow
  const filterText = props.filterText
  const category=props.Category
  const liSource = props.PRODUCTS.filter((item)=>{
    return item.category===category
  })
  const li = liSource.filter(item=>{
    if(isShow){
      return item.name.indexOf(filterText)>=0
    }else{
      return item.name.indexOf(filterText)>=0 && item.stocked!=false
    }
  })
  if(li.length>=1){
    return <div>
    <ProductCategoryRow category={category}/>
    <ProductRow categorymsg={li} filterText={filterText}/>
  </div>
  }else{
    return null
  }
}
//显示产品信息的组件
function ProductTable(props){
  let filterText = props.filterText.trim()
  let Productobj= props.PRODUCTS
  let productSet = new Set()
  let ProductArr = []
  Productobj.forEach(item => {
    productSet.add(item.category)
  });
  productSet.forEach(element=>{ 
    ProductArr.push(element)
  })
  let Categorys = ProductArr.map(item=>{
    return <ProductCategory Category={item} PRODUCTS={Productobj} key={item} filterText={filterText} isShow={props.isShow}/>
  })
  return <div className={cssobj.protable}>
    <div className={cssobj.tabletitle}>Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Price</div>
    <div className={cssobj.showProduct}>
      {Categorys}
    </div>
  </div>
}

// 最外层组件
export default class FilterableProductTable extends React.Component{
  constructor(){
    super()
    this.onSearch = this.onSearch.bind(this)
    this.showStock = this.showStock.bind(this) 
    this.state = {
      filterText : '',
      isShow:true
    }
  }
  //#region 传递给子组件
  onSearch(e){
    this.setState({
      filterText:e
    })
  }
  showStock(e){
    this.setState({
      isShow: this.state.isShow!=true?true:false
    })
  }
  //#endregion 
  render(){
    return <div className={cssobj.appbox}>
      <SearchBar onSearch={this.onSearch} showStock={this.showStock}/>
      <ProductTable PRODUCTS={PRODUCTS} filterText={this.state.filterText} isShow={this.state.isShow}/>
    </div>
  }
}
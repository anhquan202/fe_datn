import Home from "../pages/Home/Home";
import Customer from "../pages/Custmomer/Customer";
import ProductsType from "src/pages/Products/ProductsType";
import { AudioDetails, ComputerDetails, PhoneDetails } from "src/pages/Products/Details";
import Login from "src/pages/Login/login";
import DefaultLayout from "../layouts/DefautLayout";
import CreateProduct from "src/pages/Create/Product";
import CreateProductDetail from "src/pages/Create/ProductDetail";
import UpdateProduct from "src/pages/Update/Product";
const publicRoutes = [
    {path:'/', component:Login, layout:null},
    {path: '/home', component: Home, layout: DefaultLayout},
    {path: '/customer', component: Customer},
    {path:'/producttype', component:ProductsType},
    {path:'/phoneDetails', component:PhoneDetails},
    {path:'/computersDetails', component:ComputerDetails},
    {path:'/audioDetails', component:AudioDetails},
    {path: '/product/create', component: CreateProduct},
    {path: '/product/createDetail', component: CreateProductDetail},
    {path: '/product/update/:productId', component: UpdateProduct},
]
const privateRoutes = [

]

export {publicRoutes, privateRoutes};
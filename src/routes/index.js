import Home from "../pages/Home/Home";
import Customer from "../pages/Custmomer/Customer";
import Products from "src/pages/Products/Products";
import { AudioDetails, ComputerDetails, PhoneDetails } from "src/pages/Products/Details";
import Login from "src/pages/Login/Login";
import DefaultLayout from "../layouts/DefautLayout";
import CreateProduct from "src/pages/Create/Product";
import CreateProductDetail from "src/pages/Create/ProductDetail";
import UpdateProduct from "src/pages/Update/Product";
import UpdateProductDetail from "src/pages/Update/ProductDetail";
import Invoice from "src/pages/Invoice/Invoice";
import CreateInvoice from "src/pages/Create/Invoice";
import Search from "src/components/Search";
import CreateCustomer from "src/pages/Create/Customer";
import UpdateStatusInvoice from "src/pages/Update/Invoice";
const publicRoutes = [
    {path: '/search', component: Search},
    {path:'/', component:Login, layout:null},
    {path: '/home', component: Home, layout: DefaultLayout},
    {path: '/customer', component: Customer},
    {path: '/customer/create', component: CreateCustomer},
    {path:'/products', component:Products},
    {path:'/phoneDetails', component:PhoneDetails},
    {path:'/computersDetails', component:ComputerDetails},
    {path:'/audioDetails', component:AudioDetails},
    {path: '/product/create', component: CreateProduct},
    {path: '/product/createDetail', component: CreateProductDetail},
    {path: '/product/update/:productId', component: UpdateProduct},
    {path: '/product/updateDetail/:productId', component: UpdateProductDetail},
    {path: '/invoices', component: Invoice},
    {path: '/invoice/create', component: CreateInvoice},
    {path: '/invoice/updateStatus/:invoiceId', component: UpdateStatusInvoice},
]
const privateRoutes = [

]

export {publicRoutes, privateRoutes};
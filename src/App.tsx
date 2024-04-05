import { useState, useEffect } from 'react';
import 'scss/App.scss';
import { Main } from 'pages/Main/main';
import { Routes, Route, Navigate, } from 'react-router-dom';
import { Catalog } from 'pages/Catalog';
import { NotFoundPage } from 'pages/NotFoundPage';
import { Login } from 'pages/Login';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from 'app/hooks';
import { setAuth, setUser } from 'features/user/userSlice';
import AuthService from 'api/services/AuthService';
import { Registration } from 'pages/Registration/Registration';
import { PrivateLayout } from 'layouts/PrivateLayout';
import { Cabinet } from 'pages/Cabinet';
import { AuthLayout } from 'layouts/AuthLayout';
import { PageLoader } from 'components/Loader';
import { MainLayout } from 'layouts/MainLayout';
import { ROUTES } from 'app/routes';
import { UserComponent } from 'pages/Cabinet/components/Content/MainCabinet/components/UserComponent/UserComponents';
import { DealerComponent } from 'pages/Cabinet/components/Content/MainCabinet/components/DealerComponent/DealerComponent';
import { Products } from 'pages/Products';
import { Product } from 'pages/Products/Product';
import { Characters } from 'pages/Products/Product/Characters';
import { Comments } from 'pages/Products/Product/Comments';
import { Delivery } from 'pages/Products/Product/Delivery';
import { ProductLayout } from 'layouts/ProductLayout';
import { Checkout } from 'pages/Checkout';
import { ThemeProvider } from 'components/Theme';
import { History } from 'pages/Cabinet/components/Content/MainCabinet/components/HistoryComponent';
import { ConditionsOfWork } from 'pages/Cabinet/components/Content/MainCabinet/components/ConditionsOfWork';
import { Chapter } from 'pages/Cabinet/components/Content/MainCabinet/components/Chapter';



function App() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    if (localStorage.getItem('token')) {
      const checkAuth = async () => {
        try {
          const response = await AuthService.auth()
          localStorage.setItem('token', response.data.accessToken)
          dispatch(setAuth(true))
          dispatch(setUser(response.data.user))
          toast("Authorized", {
            type: "success"
          });
          console.log(response.data.user, "USER INFO")
        } catch (e: any) {
          console.log(e.response?.data?.message)
        } finally {
          setIsLoading(false)
        }
      } 
      checkAuth()
    } 
  }, [])
  ///////////////////////////////////////////////////////////////

  if (isLoading) {
    return <PageLoader />
  }
  return (
    <div className="App">
      <ThemeProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path={ROUTES.home} element={<Main />} />
            <Route path={ROUTES.catalog} element={<Catalog />} />
            <Route path={`${ROUTES.catalog}/:categoryId`} element={<Products />} />
            <Route element={<ProductLayout />}>
              <Route path={`${ROUTES.product}/:id`} element={<Product />} />
              <Route path={`${ROUTES.product}/:id` + ROUTES.productInfo.characteristics} element={<Characters />} />
              <Route path={`${ROUTES.product}/:id` + ROUTES.productInfo.comments} element={<Comments />} />
              <Route path={`${ROUTES.product}/:id` + ROUTES.productInfo.delivery} element={<Delivery />} />
            </Route>
          </Route>
          <Route element={<AuthLayout />}>
            <Route path={ROUTES.AUTH.login} element={<Login />} />
            <Route path={ROUTES.AUTH.registration} element={<Registration />} />
          </Route>
          <Route path={ROUTES.checkout} element={<Checkout />} />
          <Route element={<PrivateLayout />}>
            <Route path={ROUTES.PRIVATE.cabinet} element={<Cabinet />}>
              <Route index element={<Navigate to={ROUTES.PRIVATE.personalInformation} />} />
              <Route path={ROUTES.PRIVATE.personalInformation} element={<UserComponent />} />
              <Route path={ROUTES.PRIVATE.orders} element={<History />} />
              <Route path={ROUTES.PRIVATE.dealership} element={<DealerComponent />} />
              <Route path={ROUTES.PRIVATE.conditions} element={<ConditionsOfWork />} />
              <Route path={ROUTES.PRIVATE.applications} element={<Chapter />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;

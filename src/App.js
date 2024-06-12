import { CssBaseline } from '@mui/material'
import Router from 'router'
import Loader from 'sharedComponents/loader'
import SnackBar from 'sharedComponents/snackbar'
import { Provider } from 'react-redux'
import store from 'redux/store'
import { ThemeProvider } from '@mui/material/styles'
import theme from 'theme'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// NetworkService.setupInterceptors(store)

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        {/* <Provider store={store}> */}
        <Loader />
        <SnackBar />
        <CssBaseline />
        <Router />
        {/* </Provider> */}
      </ThemeProvider>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition="Slide"
      />
    </>
  )
}

export default App

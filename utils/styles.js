import { createTheme, makeStyles } from "@material-ui/core"

export const theme = createTheme({
    typograpy:{

    }
})
export const useStyles = makeStyles((theme) => ({
    appBar:{
        borderBottom:`1px solid grey`,
    },
    toolbar:{
        flexWrap:'wrap'
    },
    toolbarTitle:{
        flexGrow:1
    }
}))
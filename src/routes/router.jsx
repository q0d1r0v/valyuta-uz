// imports
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'

// drawer
const Drawer = createDrawerNavigator()

// pages
import HomePage from '../pages/HomePage'
import AboutPage from '../pages/AboutPage'

// routes
function RouterView() {
    return (
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name="HomePage" component={HomePage} options={{ title: 'Bosh sahifa'}} />
                <Drawer.Screen name="AboutPage" component={AboutPage} options={{ title: 'Dastur haqida' }} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default RouterView
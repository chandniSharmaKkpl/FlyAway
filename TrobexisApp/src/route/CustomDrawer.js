import * as React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'

export default  CustomDrawer =()=> {

    return (
		<View style={styles.appDrawer}>

			<Drawer.Section style={styles.drawer}>
				<Image
					source={require('../../assets/img/logo.png')}
					style={styles.drawerLogo}
					fadeDuration={0}
				/>
				<Pressable style={{ flexDirection: 'row', alignItems: 'center' }} onPress={()=>navigation.navigate("Notifications")}>
					<IconButton
						size={16}
						color="#FFF"
						icon={require('../../assets/icons/drawer/notification.png')}
					/>
					<Text style={styles.drawerItem}>Notifications</Text>

					<Pressable onPress={() => onClickNotificationSwitch()}>
						{notif ? (
							<Image
								source={require('../../assets/icons/drawer/btn-on.png')}
								style={styles.switch}
								fadeDuration={0}
							/>
						) : (
							
							<Image
								source={require('../../assets/icons/drawer/btn-off.png')}
								style={styles.switch}
								fadeDuration={0}
							/>
						)}
					</Pressable>
				</Pressable>
				<Pressable style={{ flexDirection: 'row', alignItems: 'center' }} onPress={()=>navigation.navigate("PrivacySecurity")}>
					<IconButton
						size={16}
						color="#FFF"
						icon={require('../../assets/icons/drawer/privacy.png')}
					/>
					<Text style={styles.drawerItem}>Privacy & Security</Text>
				</Pressable>
				<Pressable style={{ flexDirection: 'row', alignItems: 'center' }} 
				onPress={()=>navigation.navigate("About")}>
					<IconButton
						size={16}
						color="#FFF"
						icon={require('../../assets/icons/drawer/about.png')}
					/>
					<Text style={styles.drawerItem}>About</Text>
				</Pressable>
				<Pressable style={{ flexDirection: 'row', alignItems: 'center' }} onPress={()=>navigation.navigate("Subscription")}>
					<IconButton
						size={16}
						color="#FFF"
						icon={require('../../assets/icons/drawer/subscription.png')}
					/>
					<Text style={styles.drawerItem}>Subscription Status</Text>
				</Pressable>

				<Pressable style={{ flexDirection: 'row', alignItems: 'center' }}
				onPress={()=>navigation.navigate("EditDetails")}>
					<IconButton
						size={16}
						color="#FFF"
						icon={require('../../assets/icons/drawer/edit.png')}
					/>
					<Text style={styles.drawerItem}>Edit Details</Text>
				</Pressable>

				<Pressable style={{ flexDirection: 'row', alignItems: 'center', paddingLeft:wp('2.5%') }}
				onPress={()=>navigation.navigate("UpdateEmail")}>
					<IconMaterialCommunity
					name="email"
						size={18}
						color="#FFF"
						
					/>
					<Text style={styles.drawerItem}>  Update Email</Text>
				</Pressable>
			</Drawer.Section>
			<Button
				mode="contained"
				style={styles.btn}
				uppercase={false}
				color={theme.colors.accent}
				onPress={() =>  {
					removeCurrentUser() // Remove current logged in user from asyn storage
					setUserData(null)
					}}>
				Logout
			</Button>
			<Caption style={styles.appVersion}>App version 1.0</Caption>
		</View>
	)
}

const styles = StyleSheet.create({
	appDrawer: {
		flex: 1,

		backgroundColor: '#3389df'
	},
	drawer: {
		flex: 1,
		marginVertical: 20,
		//backgroundColor:'red'
	},
	drawerLogo: {
		width: '90%',
		height: 80,
		resizeMode: 'contain',
		marginVertical: 10,
		alignSelf: 'center',
		tintColor: '#FFF'
	},
	drawerItem: {
		color: '#FFF',
		paddingVertical: 16,
		flex: 1
	},
	drawerItemUpdateEmail: {
		color: '#FFF',
		paddingVertical: 19,
		flex: 1
	},
	btn: {
		width: 140,
		marginHorizontal: 10,
		marginVertical: 20,
		borderRadius: 10
	},
	appVersion: {
		textAlign: 'center',
		marginBottom: 20,
		color: '#FFF'
	},
	switch: {
		width: 60,
		height: 30,
		resizeMode: 'contain',
		marginRight: 20
	}
})
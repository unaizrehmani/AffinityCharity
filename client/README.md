# Affinity - React Native ✋

## The Front End App
This is the front end client which we built using react native. The choice for react native was based on the fact we wanted to have this app hosted on iOS and Android and wanted to use one development workflow for both. To get started on developing or checking out the application follow the steps below.

## React Native Setup
Before we can add to the application we need to setup react native on our machine to work with native libraries like iOS and Android. If you wish to develop on iOS then you must be using a mac. To set up react native on your machine please follow the [official guidlines here](https://facebook.github.io/react-native/docs/getting-started). For the setup of the application we recommend running it using the iOS setup with Mac environment.

Once the setup is done and `node`, `watchman` and `react-native cli` are all installed as well as having the latest versions of XCode you can clone the repo and `cd` into `/client/Affinity`. 

Once your inside you can run `react-native run-ios` to have the app running on the iOS simulator. This may take a few mintues the first time as it will be installing a lot of files onto the simulator.

## VS Code Settings
If working on VS code then you may run into errors as the language support for react native uses `Flow` and this is not supported by VS code by default. To allow for this to work please isntall [the flow extension](https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode) and follow the instructions to utilize it.
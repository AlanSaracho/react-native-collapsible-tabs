# react-native-collapsible-tabs

Tabs screen with collapsible header component for react native


![Alt Text](https://raw.githubusercontent.com/AlanSaracho/react-native-collapsible-tabs/master/images/collapsible-tabs.gif)

# Usage

```
yarn add react-native-collapsible-tabs react-native-material-tabs react-native-snap-carousel
```


```javascript
import {CollapsibleTabs} from 'react-native-collapsible-tabs';

<CollapsibleTabs
    collapsibleContent={(<CustomHeader/>)}
    tabs={[{
        label: 'Tab 1',
        component: (<MyComponent/>)
    }, {
        label: 'Tab 2',
        isFlatList: true, // this is important
        component: (
            <FlatList
                data={data}
                renderItem={({index}) => (
                    <Text>Flatlist Item {index}</Text>
                )}
            />
        )
    }]}
/>
```

# Customize Tabs

Collapsible tabs use material tabs (https://github.com/iRoachie/react-native-material-tabs).

Example:
```javascript
import {CollapsibleTabs} from 'react-native-collapsible-tabs';

<CollapsibleTabs
  barColor="#3826f7"
  scrollable
  inactiveTextColor"gray"
  ...
/>
```




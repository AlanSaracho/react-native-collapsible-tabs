import React, {Component} from 'react';
import {View, Dimensions, Animated, ScrollView} from 'react-native';
import {map, min} from 'lodash';
import PropTypes from 'prop-types';
import Carousel from 'react-native-snap-carousel';
import MaterialTabs from 'react-native-material-tabs';
import DefaultHeader from './DefaultHeader';

const headerCollapsedHeight = 46;
const {width: screenWidth} = Dimensions.get('screen');

const styles = {
    tabsContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'stretch'
    }
}

class CollapsibleTabs extends Component {

    scrolls = [];

    constructor(props){
        super(props);
        this.headerExpandedHeight = headerCollapsedHeight;
        this.state = {
            scrollY: new Animated.Value(0),
            selectedTab: 0
        }
    }

    onChangePage(index) {
        const {scrollY} = this.state;
        Animated.timing(scrollY, {
            toValue: min([this.scrolls[index] || 0, this.headerExpandedHeight]),
            duration: 200,
            useNativeDriver: true
        }).start();

        this.carousel.snapToItem(index);
        this.setState({selectedTab: index});
    }

    render() {
        const {selectedTab, scrollY} = this.state;
        const {collapsibleContent, tabs} = this.props;
        const {headerExpandedHeight} = this;

        const headerHeight = scrollY.interpolate({
            inputRange: [0, headerExpandedHeight-headerCollapsedHeight],
            outputRange: [0, -(headerExpandedHeight-headerCollapsedHeight)],
            extrapolate: 'clamp'
        });

        const scrollProps = index => ({
            contentContainerStyle: {paddingTop: headerExpandedHeight},
            scrollEventThrottle: 16,
            onScroll: Animated.event([{
                nativeEvent: {
                    contentOffset: {
                        y: this.state.scrollY
                    }
                }
            }], {
                listener: ({nativeEvent}) =>  (this.scrolls[index] = nativeEvent.contentOffset.y)
            })
        });
        
        return (
            <View style={{flex: 1}}>
                <Carousel
                    ref={ref => this.carousel = ref}
                    onSnapToItem={index => this.onChangePage(index)}
                    style={{flex: 1}}
                    data={tabs}
                    itemWidth={screenWidth}
                    sliderWidth={screenWidth}
                    inactiveSlideScale={1}
                    renderItem={({item: {component, isFlatList}, index}) => (
                        isFlatList
                            ? React.cloneElement(component, scrollProps(index))
                            : (
                                <ScrollView {...scrollProps(index)}>
                                    {component}
                                </ScrollView>
                            )
                    )}
                />
                {/* HEADER */}
                <Animated.View
                    style={{
                        transform: [{translateY: headerHeight}],
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0
                    }}
                    onLayout={({nativeEvent}) => {
                        if(this.headerExpandedHeight === headerCollapsedHeight){
                            this.forceUpdate();
                        }
                        this.headerExpandedHeight = nativeEvent.layout.height + 0.1;
                    }}
                >
                    {collapsibleContent}
                    <View style={{height: headerCollapsedHeight}}/>
                    <View style={styles.tabsContainer}>
                        <MaterialTabs
                            {...this.props}
                            items={map(tabs, ({label}) => label)}
                            selectedIndex={selectedTab}
                            onChange={index => this.onChangePage(index)}
                        />
                    </View>
                </Animated.View>
            </View>
        )
    }
}

CollapsibleTabs.defaultProps = {
    collapsibleContent: (<DefaultHeader/>)
};

CollapsibleTabs.propTypes = {
    collapsibleContent: PropTypes.element,
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            component: PropTypes.element,
            isFlatList: PropTypes.bool
        })
    ).isRequired,
    ...MaterialTabs.propTypes,
    items: PropTypes.any,
    onChange: PropTypes.any
}

export default CollapsibleTabs;

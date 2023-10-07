import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Mainlayout from '../components/layout/Mainlayout'
import productServices from '../services/productServices'
import { FlatList } from 'react-native'
import CollectionItems from '../components/products/CollectionItems'
import CollectionSkeleton from '../components/loader/CollectionSkeleton'

const AllCollection = ({navigation}) => {
    const[loadingMore,setLoadingMore]=useState(false)
    const[data,setData]=useState([])
    const[loading,setLoading]=useState(false)
    const[page,setPage]=useState(1)


    const fetchData = () => {
        // console.log("hitting")
        setLoadingMore(true);
        productServices
          .allCollection(page, 20)
          .then((res) => {
            // setLoading(false);
            // console.log(res.data.data.data)
            // flatListRef.current.scrollToEnd({ animated: false });
            // console.log(res.data.meta.last_page, page);
            if (res.data.data.data.length > 0) {
              setData([...data, ...res.data.data.data]);
              setLoading(false);
              setPage(page + 1);
            //   setLastPage(res.data.meta.last_page);
            } else {
              setLoadingMore(false);
    
              // setData([...data,{id}])
            }
          })
          .catch((err) => {
            setLoadingMore(false);
            // console.log(err)
    
          });
        // console.log(res.data.meta, "product apo");
      };
      useEffect(()=>{
        fetchData()
      },[])
    //   console.log(data,"data")

    const renderItem = ({ item ,index}) => {
        // console.log(item?.name)
   
      return  <CollectionItems
      name={item?.name}
      from={"allCollection"}
      

      key={index}
      products={item?.products}


      navigation={navigation}
    />
    };

    
  const renderFooter = () => {
    // if (!loadingMore)
    //   return (
    //     <View style={{ height: scale(350), marginTop: 20 }}>
    //       {page > lastPage && (
    //         <Text style={{ textAlign: "center", color: "red" }}>
    //           No more data
    //         </Text>
    //       )}
    //     </View>
    //   );

    return (
      <View
        style={{
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
          paddingBottom: 200,
          // height: scale(500),
          // marginBottom:20
        }}
      >
      
        <ScrollView>
         
            
            <CollectionSkeleton />
            <CollectionSkeleton />

          
        </ScrollView>
      </View>
    );
  };
    
    
  return (
    <Mainlayout >
      
          {loading && data.length == 0 && (
          <View>
            <CollectionSkeleton />
                
            <CollectionSkeleton />
            <CollectionSkeleton />
            <CollectionSkeleton />
          </View>)
          }
      <FlatList
          ListHeaderComponent={()=>  <Text style={{fontSize:20,fontWeight:"500",padding:10,marginTop:10}}>All Collection</Text>}
        //   refreshControl={
        //     <RefreshControl
        //       colors={["red"]}
        //       tintColor="red"
        //       title="Refreshing..."
        //       titleColor="red"
        //       refreshing={refreshing}
        //       onRefresh={onRefresh}
        //     />
        //   }
        //   numColumns={2}
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
          keyExtractor={(item) => item.id.toString()}
          onEndReached={fetchData}
          onEndReachedThreshold={0.5}
        />
    </Mainlayout>
  )
}

export default AllCollection

const styles = StyleSheet.create({})
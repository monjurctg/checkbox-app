import { StyleSheet, Text, View } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import productServices from '../services/productServices';
import CollectionItems from './products/CollectionItems';
import CollectionSkeleton from './loader/CollectionSkeleton';

const Collections = ({ refreshing, navigation }) => {
    const [collections, setCollections] = useState([]);
    const [collectionLoading, setCollectionLoading] = useState(false);

    const fetchCollection = () => {
        // alert("calling")
        setCollectionLoading(true);
        productServices
            .productCollection()
            .then((res) => {
                // console.log(res.data.data[0].products, "top Selling ");
                setCollections(res.data.data);
                setCollectionLoading(false);
            })
            .catch((err) => {
                setCollectionLoading(false);
            });
    };

    useEffect(() => {
        fetchCollection();

    }, [refreshing]);


    return (
        <View>
            {collectionLoading && collections.length == 0 && (
                <View>
                    <CollectionSkeleton />
                    <CollectionSkeleton />
                </View>
            )}
            {collections.map((collection, index) => {
                // console.log(collection.products,"fkdfkd")

                return <CollectionItems
                    //   from={"allCollection"}
                    name={collection?.name}
                    slug={collection}
                    key={index}
                    products={collection?.products}
                    navigation={navigation}
                />
            })}

        </View>
    )
}

export default memo(Collections)

const styles = StyleSheet.create({})
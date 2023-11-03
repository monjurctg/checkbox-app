import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
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
                // console.log(res.data.data.items, "top Selling ");
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
                // console.log(collection,"fkdfkd")

                return <CollectionItems
                    //   from={"allCollection"}
                    name={collection?.name}
                    slug={collection}
                    key={index}
                    products={collection?.products?.splice(0, 10)}
                    navigation={navigation}
                />
            })}

        </View>
    )
}

export default Collections

const styles = StyleSheet.create({})
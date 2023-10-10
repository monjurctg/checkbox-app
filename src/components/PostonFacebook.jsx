import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView } from 'react-native';
// import CheckBoxGroup from 'react-native-checkbox-group';
import { Image, TextArea } from 'react-native';

const removeTags = (str) => {
  return str?.replace(/<[^>]+>/g, '');
}

const capitalizeFirstLetter = (str) => {
  return str?.replace(/^\w/, (char) => char.toUpperCase());
}

function PostonFacebook({
  showPostFbModal,
  postToFacebook,
  handleCheckboxChange,
  setShowPostFbModal,
  product,
  handleImageSelect,
  selectedImages,
  options,
  pages,
}) {
  const [postText, setPostText] = useState('');

  const contentTextGenrt = () => {
    let name = product?.name
    let desc = removeTags(product?.description)
    let cntnt = capitalizeFirstLetter(name) + `\n` + desc
    return cntnt
  }

  useEffect(() => {
    setPostText(contentTextGenrt())
  }, [product])

  return (
    <Modal
      visible={showPostFbModal}
      onRequestClose={() => setShowPostFbModal(false)}
      animationType="slide"
    >
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 10 }}>
          Post on Facebook
        </Text>
        <View style={{ padding: 10 }}>
          <Text style={{ fontWeight: '600', fontSize: 15 }}>Pages</Text>
          {/* <CheckBoxGroup
            labelStyle={{ marginLeft: 10 }}
            options={options}
            onChange={handleCheckboxChange} 
          /> */}
        </View>
        {/* Render pages here */}
        <View style={{ marginTop: 25, padding: 10 }}>
          <Text style={{ fontWeight: '600', fontSize: 15 }}>Image</Text>
          <ScrollView horizontal style={{ marginTop: 10 }}>
            {product?.photos.map((image, index) => {
              const isSelected = selectedImages?.includes(`img-` + index);
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    marginRight: 15,
                    borderRadius: 5,
                    borderWidth: isSelected ? 2 : 0,
                    borderColor: isSelected ? '#be202e' : 'transparent',
                    padding: isSelected ? 5 : 0,
                    cursor: 'pointer',
                  }}
                  onPress={() => handleImageSelect(`img-` + index)}
                >
                  <Image
                    id={`img-` + index}
                    source={{ uri: image.path ? image.path : image }}
                    alt={`product-images-` + index}
                    style={{
                      width: 100,
                      height: 100,
                      resizeMode: 'cover',
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <View style={{ marginTop: 25, padding: 10 }}>
          <Text style={{ fontWeight: '600', fontSize: 15 }}>Description</Text>
          <TextArea
            rows={6}
            placeholder="Enter your text..."
            style={{ marginTop: 10 }}
            value={postText}
            onChangeText={(text) => setPostText(text)}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#be202e',
            padding: 10,
            alignItems: 'center',
            marginTop: 20,
          }}
          onPress={postToFacebook}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Post</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

export default PostonFacebook;

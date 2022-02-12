import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {telefuncConfig} from 'telefunc/dist/client';
import {readPostList} from './readPostList.telefunc';

// Since the app is running on the mobile device, it's IP address is different
// form the IP address of the server.
// When running the app in the iOS simulator, requests to localhost:3000 work
// since it's running on the same IP address, but when you install the app
// on an physical device, you should change this to the IP of the computer
// where the server is running.
telefuncConfig.telefuncUrl = 'http://localhost:3000/_telefunc';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    readPostList()
      .then(post => {
        setData(post);
      })
      .catch(err => {
        setError(String(err));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <View style={S.container}>
      <Text style={S.text}>
        {JSON.stringify(
          {
            isLoading,
            error,
            data,
          },
          null,
          2,
        )}
      </Text>
    </View>
  );
}

const S = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center'},
  text: {fontSize: 16},
});

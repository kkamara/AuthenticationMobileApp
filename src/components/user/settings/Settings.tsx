import ErrorComponent from '@/components/Error';
import { Text, View } from '@/components/Themed';
import { useAccounts } from '@/providers/AccountsProvider';
import { isCustomErrorResponse } from '@/typeHandlers';
import {
  useEffect,
  useState,
  useCallback,
} from 'react';
import { StyleSheet } from 'react-native';
import UpdateAvatar from './UpdateAvatar';
import Loading from '@/components/Loading';
import { useNavigation, useFocusEffect, } from 'expo-router/react-navigation';

const Settings = () => {
  const [error, setError] = useState("");
  const { authorise } = useAccounts();
  const [user, setUser] = useState<UserResponse | null>(null)
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    return navigation.addListener(
      'blur',
      async () => {
        setUser(null);
        setLoading(false);
        setError("");
      }
    );
  }, [])

  useFocusEffect(
    useCallback(() => {
      getUserData();
    }, [])
  );

  async function getUserData() {
    setLoading(true);
    const res = await authorise();
    if (true === isCustomErrorResponse(res)) {
      setError(res.error || "Something went wrong.");
    } else {
      console.log("Settings user data from server", res.data);
      setUser(res.data as UserResponse);
    }
    setLoading(false);
  }

  async function onUploadAvatar() {
    await getUserData();
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Loading />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.title}>Settings</Text>
      </View>
      <ErrorComponent style={styles.errorView} error={error} />
      <UpdateAvatar
        user={user}
        setError={setError}
        setLoading={setLoading}
        onUploadAvatar={onUploadAvatar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  titleView: {
    width: 300,
  },
  title: {
    fontSize: 26,
    borderBottomWidth: 1,
    textAlign: 'center',
  },
  errorView: {
    marginTop: 15,
    marginBottom: 20,
  },
});

export default Settings;

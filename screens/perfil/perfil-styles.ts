import { StyleSheet } from 'react-native';

export const perfilStyles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    justifyContent: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: '#fff',
    resizeMode: 'cover',
    backgroundColor: '#000',
  },

  titulo: {
    color: '#fff',
    fontSize: 26,
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 10,
  },
  label: {
    color: '#888',
    fontSize: 14,
    marginTop: 10,
  },
  valor: {
    color: '#fff',
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingVertical: 4,
  },
  texto: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  bg: {
    flex: 1,
  },
  botao: {
    marginTop: 20,
    backgroundColor: '#4b0c00',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
  },
});

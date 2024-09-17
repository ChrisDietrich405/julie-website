import {useContext} from "react";
import { userContext } from './userContext'

export default function useUserContext() {
  return useContext(userContext)
}
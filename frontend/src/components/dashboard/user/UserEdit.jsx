import React, { useState, useContext } from 'react'
import { UserContext } from '../../../App'
import { checkUsernameExists } from '../../../apis/Auth'
import { updateUser } from '../../../apis/User'
import useTitle from '../../../hooks/useTitle'

const UserEdit = () => {
  const [user, setUser] = useContext(UserContext)
  useTitle(`Edit | ${user.username}`)

  const [firstName, setFirstName] = useState(user.firstName)
  const [lastName, setLastName] = useState(user.lastName)
  const [emails, setEmail] = useState(user.email)
  return (
    <div>UserEdit</div>
  )
}

export default UserEdit
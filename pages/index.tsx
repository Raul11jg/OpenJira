import type { NextPage } from 'next'
import { Layout } from '../components/layouts/Layout'
import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import { EntryList, NewEntry } from '../components/ui'

const Home: NextPage = () => {
  return (
    <Layout title='Home - OpenJira'>
      <Grid container spacing={2}>

        <Grid item xs={12} sm={4} >
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='Pendientes' />
              <NewEntry />
              <EntryList status='pending' ></EntryList>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4} >
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='En Progreso' />
            <EntryList status='in-progress'></EntryList>

          </Card>
        </Grid>

        <Grid item xs={12} sm={4} >
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title='Completadas' />
            <EntryList status='finished' ></EntryList>

          </Card>
        </Grid>

      </Grid>
    </Layout>
  )
}

export default Home
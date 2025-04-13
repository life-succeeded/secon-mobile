import { Route, Routes } from 'react-router'
import ActCreate from '../pages/ActCreate'
import ActList from '../pages/ActList'
import Map from '../pages/Map'
import Reports from '../pages/Reports'
import Tasks from '../pages/Tasks'
import { ActDetails } from '../pages/ActDetails'
import { Wrapper } from '../components/core/wrapContent'
import { FullScreenWrapper } from '../components/core/fullScreen'
import { Login } from '../pages/Login'
import { ProtectedRoute } from '../components/core/protectedRoute'

export const AppRoutes = () => (
    <Routes>
        <Route
            path="/"
            element={
                <ProtectedRoute>
                    <FullScreenWrapper>
                        <Wrapper>
                            <Tasks />
                        </Wrapper>
                    </FullScreenWrapper>
                </ProtectedRoute>
            }
        />
        <Route
            path="/create"
            element={
                <ProtectedRoute>
                    <FullScreenWrapper>
                        <Wrapper>
                            <ActCreate />
                        </Wrapper>
                    </FullScreenWrapper>
                </ProtectedRoute>
            }
        />
        <Route
            path="/acts"
            element={
                <ProtectedRoute>
                    <FullScreenWrapper>
                        <Wrapper>
                            <ActList />
                        </Wrapper>
                    </FullScreenWrapper>
                </ProtectedRoute>
            }
        />
        <Route
            path="/map"
            element={
                <ProtectedRoute>
                    <FullScreenWrapper>
                        <Wrapper>
                            <Map />
                        </Wrapper>
                    </FullScreenWrapper>
                </ProtectedRoute>
            }
        />
        <Route
            path="/report"
            element={
                <ProtectedRoute>
                    <FullScreenWrapper>
                        <Wrapper>
                            <Reports />
                        </Wrapper>
                    </FullScreenWrapper>
                </ProtectedRoute>
            }
        />
        <Route
            path="/acts/:id"
            element={
                <ProtectedRoute>
                    <FullScreenWrapper>
                        <Wrapper>
                            <ActDetails />
                        </Wrapper>
                    </FullScreenWrapper>
                </ProtectedRoute>
            }
        />
        <Route
            path="/login"
            element={
                <FullScreenWrapper>
                    <Login />
                </FullScreenWrapper>
            }
        />
    </Routes>
)

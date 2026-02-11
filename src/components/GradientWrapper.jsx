import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const GradientWrapper = ({ children, colors = ['#0f172a', '#1e293b', '#334155'], style, ...props }) => {
    return (
        <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="flex-1"
            style={style}
            {...props}
        >
            {children}
        </LinearGradient>
    );
};

export default GradientWrapper;

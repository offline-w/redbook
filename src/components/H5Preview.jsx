import { useEffect, useState } from 'react';

const DEFAULT_STOPS = [
  { name: '你的第一站', type: '等待生成…', duration: '' },
  { name: '第二站', type: '', duration: '' },
  { name: '最终目的地', type: '', duration: '' },
];

export default function H5Preview({ generatedData }) {
  const [energyWidth, setEnergyWidth] = useState(0);

  const data = generatedData || {};
  const stops = data.stops || DEFAULT_STOPS;
  const keyword = data.keyword || '城市微冒险';
  const energy = data.energy ?? 0;

  useEffect(() => {
    const t = setTimeout(() => setEnergyWidth(energy), 80);
    return () => clearTimeout(t);
  }, [energy]);

  return (
    <div className="h5-preview-wrap">
      <div className="phone-mockup">
        <div className="phone-screen">
          <div className="phone-notch" />
          <div className="phone-inner">
            <div className="phone-header">
              <div className="phone-kw">{keyword}</div>
              <div className="phone-energy-wrap">
                <span className="phone-energy-label">能量值</span>
                <div className="phone-energy-bar">
                  <div
                    className="phone-energy-fill"
                    style={{ width: `${energyWidth}%` }}
                  />
                </div>
                <span className="phone-energy-val">{energy}</span>
              </div>
            </div>
            <div className="phone-route">
              {stops.map((stop, i) => (
                <div key={i} className="route-node">
                  <div className="node-dot" />
                  {i < stops.length - 1 && <div className="node-line" />}
                  <div className="node-info">
                    <div className="node-name">{stop.name}</div>
                    {stop.type && <div className="node-type">{stop.type}{stop.duration ? ` · ${stop.duration}` : ''}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

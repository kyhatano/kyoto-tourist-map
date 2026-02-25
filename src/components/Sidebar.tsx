import type { TouristLocation, AreaType } from '../data/locations';
import { MapPin, Lightbulb, ExternalLink } from 'lucide-react';

interface SidebarProps {
    locations: TouristLocation[];
    onSelectLocation: (loc: TouristLocation) => void;
    showPrimary: boolean;
    setShowPrimary: (val: boolean) => void;
    showSecondary: boolean;
    setShowSecondary: (val: boolean) => void;
    isFocused?: boolean;
}

const areas: AreaType[] = ['洛中・嵐山', '東山', '洛南（宇治）', '海の京都'];

export default function Sidebar({
    locations,
    onSelectLocation,
    showPrimary, setShowPrimary,
    showSecondary, setShowSecondary,
    isFocused = false
}: SidebarProps) {

    // フィルタリング後のロケーションを取得
    const filteredLocs = locations.filter(loc => {
        if (loc.type === 'primary' && !showPrimary) return false;
        if (loc.type === 'secondary' && !showSecondary) return false;
        return true;
    });

    return (
        <div className={`w-full md:w-[380px] ${isFocused ? 'h-[25vh]' : 'h-[50vh]'} md:h-full bg-white flex flex-col shadow-xl z-20 shrink-0 transition-all duration-300 rounded-t-2xl md:rounded-none`}>
            {/* Header */}
            <div className="p-3 md:p-6 md:pb-5 bg-gradient-to-br from-[#8b3a3a] to-[#5c2626] text-white flex justify-between items-center md:block rounded-t-2xl md:rounded-none shrink-0">
                <h1 className="text-lg md:text-2xl font-bold font-['Noto_Serif_JP'] tracking-wider mb-0 md:mb-1">
                    京都周遊マップ
                </h1>
                <p className="text-sm font-['Outfit'] opacity-85 tracking-wide hidden md:block">
                    Kyoto Explorer Map
                </p>
            </div>

            {/* Control Panel (Checkboxes) */}
            <div className="p-2 md:p-4 bg-[#f4efeb] border-b border-[#e0d8d0] shrink-0">
                <h2 className="hidden md:block text-sm font-bold text-[#666] mb-3 ml-1">表示設定</h2>
                <div className="flex flex-row md:flex-col gap-2 md:gap-3">
                    <label className="flex-1 flex items-center p-1.5 md:p-2 rounded-lg bg-white border border-[#e8e4db] cursor-pointer hover:border-[#8b3a3a] transition-colors relative overflow-hidden">
                        <div className={`absolute left-0 top-0 bottom-0 w-1 md:w-1.5 ${showPrimary ? 'bg-[#8b3a3a]' : 'bg-gray-200'}`} />
                        <input
                            type="checkbox"
                            className="w-4 h-4 md:w-5 md:h-5 ml-1.5 md:ml-2 mr-1.5 md:mr-3 accent-[#8b3a3a] cursor-pointer"
                            checked={showPrimary}
                            onChange={(e) => setShowPrimary(e.target.checked)}
                        />
                        <div className="flex flex-col md:flex-row md:items-center justify-between flex-grow pr-1">
                            <span className="font-bold text-[#333] font-['Noto_Serif_JP'] flex items-center gap-1 md:gap-1.5 text-[11px] md:text-base">
                                <MapPin size={16} className="text-[#8b3a3a] hidden md:block" />
                                <MapPin size={13} className="text-[#8b3a3a] md:hidden" />
                                目的地
                            </span>
                            <span className="hidden md:inline-block text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Primary</span>
                        </div>
                    </label>

                    <label className="flex-1 flex items-center p-1.5 md:p-2 rounded-lg bg-white border border-[#e8e4db] cursor-pointer hover:border-[#4B6043] transition-colors relative overflow-hidden">
                        <div className={`absolute left-0 top-0 bottom-0 w-1 md:w-1.5 ${showSecondary ? 'bg-[#4B6043]' : 'bg-gray-200'}`} />
                        <input
                            type="checkbox"
                            className="w-4 h-4 md:w-5 md:h-5 ml-1.5 md:ml-2 mr-1.5 md:mr-3 accent-[#4B6043] cursor-pointer"
                            checked={showSecondary}
                            onChange={(e) => setShowSecondary(e.target.checked)}
                        />
                        <div className="flex flex-col md:flex-row md:items-center justify-between flex-grow pr-1">
                            <span className="font-bold text-[#333] font-['Noto_Serif_JP'] flex items-center gap-1 md:gap-1.5 text-[11px] md:text-base">
                                <Lightbulb size={16} className="text-[#4B6043] hidden md:block" />
                                <Lightbulb size={13} className="text-[#4B6043] md:hidden" />
                                おすすめ
                            </span>
                            <span className="hidden md:inline-block text-xs border border-gray-200 text-gray-400 px-2 py-0.5 rounded-full">Options</span>
                        </div>
                    </label>
                </div>
            </div>

            {/* List Area */}
            <div className="flex-grow overflow-y-auto p-4 custom-scrollbar">
                {areas.map(area => {
                    const areaLocs = filteredLocs.filter(l => l.area === area);
                    if (areaLocs.length === 0) return null;

                    return (
                        <div key={area} className="mb-8">
                            <div className="flex items-center gap-2 mb-4 border-b-2 border-[#c3a44d] pb-1">
                                <span className="w-2 h-2 rounded-full bg-[#c3a44d]"></span>
                                <h2 className="text-lg font-bold text-[#8b3a3a] font-['Noto_Serif_JP']">{area}</h2>
                                <span className="text-xs text-gray-400 ml-auto">{areaLocs.length}件</span>
                            </div>

                            <div className="flex flex-col gap-3">
                                {areaLocs.map(loc => (
                                    <div
                                        key={loc.id}
                                        className="group bg-white border border-[#e8e4db] rounded-xl p-4 cursor-pointer hover:-translate-y-1 hover:shadow-md transition-all duration-300 relative overflow-hidden"
                                        onClick={() => onSelectLocation(loc)}
                                    >
                                        {/* Hover indicator line */}
                                        <div className={`absolute left-0 top-0 h-full w-1 scale-y-0 group-hover:scale-y-100 transition-transform origin-top ${loc.type === 'primary' ? 'bg-[#8b3a3a]' : 'bg-[#4B6043]'}`} />

                                        <div className="flex items-start justify-between mb-1.5">
                                            <h3 className="font-bold text-[#333] font-['Noto_Serif_JP'] text-base pr-2 group-hover:text-[#8b3a3a] transition-colors">{loc.name}</h3>
                                            {loc.type === 'secondary' && (
                                                <span className="bg-[#e9f2e7] text-[#4B6043] text-[10px] px-1.5 py-0.5 rounded font-bold shrink-0">おすすめ</span>
                                            )}
                                        </div>
                                        <p className="text-[13px] text-[#666] leading-relaxed mb-3">{loc.desc}</p>

                                        <a
                                            href={`https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded transition-colors no-underline w-fit"
                                            onClick={(e) => e.stopPropagation()} // マップへのズームを発火させない
                                        >
                                            <ExternalLink size={12} className="mr-1" />
                                            Googleマップで経路検索
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
                {filteredLocs.length === 0 && (
                    <div className="text-center text-gray-400 py-10 text-sm">
                        表示するスポットがありません。<br />表示設定のチェックを入れてください。
                    </div>
                )}
            </div>

            <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #c3a44d; 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a38739; 
        }
      `}</style>
        </div>
    );
}
